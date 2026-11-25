"use client";

import type { RefObject } from "react";
import { useEffect, useMemo, useRef } from "react";
import { animatePreparedElement } from "../engine/animate.js";
import { isController } from "../engine/controller.js";
import { report } from "../engine/errors.js";
import type { AnimationHandle, Timing } from "../engine/types.js";
import { bindPlayback } from "../internal/playback.js";
import { resolveAnimation } from "../internal/resolve.js";
import { dataKey, parseData } from "../internal/stable.js";
import type { MotionImageProps } from "../types.js";
import { calculateDelays } from "../utils.js";
import { useLatest } from "./use-latest.js";
import { usePreparedAnimation } from "./use-prepared-animation.js";
/** Tile effects live outside React state. Pointer activity only plays the affected handles. */
export function useImageGrid(
  ref: RefObject<HTMLDivElement | null>,
  ready: boolean,
  props: MotionImageProps,
) {
  const { definition, timing } = useMemo(
    () => resolveAnimation(props.animation),
    [props.animation],
  );
  const compiled = usePreparedAnimation(definition);
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
    timing,
    offsets,
  });

  const spec = useMemo(
    () =>
      parseData<{
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
          animatePreparedElement(node, compiled, {
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
  }, [ref, ready, compiled, spec, reducedMotion, callbacks]);

  const input = props.controller,
    imperativeController = isController(input),
    declarative = imperativeController ? undefined : input,
    controls = imperativeController ? input : declarative?.controls;

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: Rebind whenever the effect above replaces the tile handles.
  useEffect(() => {
    if (!ready || !ref.current) return;
    if (imperativeController)
      return bindPlayback(ref.current, handles.current, controls);

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
    compiled,
    spec,
    reducedMotion,
    imperativeController,
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
