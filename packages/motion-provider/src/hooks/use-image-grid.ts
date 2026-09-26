"use client";

import type { RefObject } from "react";
import { useEffect, useMemo, useRef } from "react";
import { animateElement } from "../engine/animate.js";
import { isController } from "../engine/controller.js";
import { report } from "../engine/errors.js";
import { bindPlayback } from "../internal/playback.js";
import { resolveAnimation } from "../internal/resolve.js";
import { dataKey, parseData } from "../internal/stable.js";
import type {
  AnimationHandle,
  AnimationModule,
  MotionImageProps,
  Timing,
} from "../types.js";
import { calculateDelays } from "../utils.js";
import { useLatest } from "./use-latest.js";
/** Tile effects live outside React state. Pointer activity only plays the affected handles. */
export function useImageGrid(
  ref: RefObject<HTMLDivElement | null>,
  ready: boolean,
  props: MotionImageProps,
) {
  const { definition, timing } = resolveAnimation(props.animation);
  const { pieces, duration, delayLogic, customLogic, seed, maxDelay, fn } =
    props.config;

  const offsets = calculateDelays(pieces, {
    baseDuration: duration ?? 0.08,
    delayLogic: customLogic ? "custom" : delayLogic,
    customLogic,
    seed,
    maxDelay,
  });

  const key = dataKey({
    definition,
    timing,
    offsets,
  });

  const spec = useMemo(
    () =>
      parseData<{
        definition: AnimationModule;
        timing: Timing;
        offsets: number[];
      }>(key),
    [key],
  );

  const handles = useRef<AnimationHandle[]>([]),
    callbacks = useLatest({
      error: props.onMotionError,
      complete: props.onMotionComplete,
    });

  const reducedMotion = props.reducedMotion;

  useEffect(() => {
    if (!ready || !ref.current) return;
    const nodes = Array.from(ref.current.children) as HTMLElement[];
    let active = true;
    const effects: AnimationHandle[] = [];
    try {
      nodes.forEach((node, i) => {
        effects.push(
          animateElement(node, spec.definition, {
            ...spec.timing,
            delay: (spec.timing.delay ?? 0) + (spec.offsets[i] ?? 0),
            autoplay: false,
            reducedMotion,
            onError: (error) => report(error, callbacks.current.error),
            onFinish: (result) => {
              if (
                active &&
                result.status === "finished" &&
                effects.length === nodes.length &&
                effects.every((h) => h.playState === "finished")
              )
                callbacks.current.complete?.(result);
            },
          }),
        );
      });
    } catch (error) {
      for (const effect of effects) effect.dispose();
      throw error;
    }

    handles.current = effects;

    return () => {
      active = false;
      for (const effect of effects) effect.dispose();
      handles.current = [];
    };
  }, [ref, ready, spec, reducedMotion, callbacks]);

  const input = props.controller,
    declarative = isController(input) ? undefined : input;

  const controls = isController(input) ? input : declarative?.controls;

  const trigger = declarative?.trigger,
    reverse = declarative?.reverse,
    stopped = declarative?.isAnimationStopped;

  const v = declarative?.configView,
    s = declarative?.scroll;

  const amount = v?.amount,
    once = v?.once,
    margin = v?.margin,
    root = v?.root,
    hasScroll = !!s;

  const source = s?.source,
    target = s?.target,
    axis = s?.axis,
    mode = s?.mode,
    start = s?.start,
    end = s?.end;

  useEffect(() => {
    if (!ready || !ref.current) return;

    return bindPlayback(
      ref.current,
      handles.current,
      {
        controls,
        trigger,
        reverse,
        isAnimationStopped: stopped,
        configView: {
          amount,
          once,
          margin,
          root,
        },
        scroll: hasScroll
          ? {
              source,
              target,
              axis,
              mode,
              start,
              end,
            }
          : undefined,
      },
      !!fn,
    );
  }, [
    ref,
    ready,
    controls,
    trigger,
    reverse,
    stopped,
    amount,
    once,
    margin,
    root,
    hasScroll,
    source,
    target,
    axis,
    mode,
    start,
    end,
    fn,
  ]);

  return (index: number) => {
    const columns = Math.sqrt(pieces),
      row = Math.floor(index / columns),
      col = index % columns;

    for (let y = Math.max(0, row - 1); y <= Math.min(columns - 1, row + 1); y++)
      for (
        let x = Math.max(0, col - 1);
        x <= Math.min(columns - 1, col + 1);
        x++
      ) {
        const handle = handles.current[y * columns + x];
        if (
          handle &&
          handle.playState !== "running" &&
          handle.playState !== "finished"
        )
          void handle.play();
      }
  };
}
