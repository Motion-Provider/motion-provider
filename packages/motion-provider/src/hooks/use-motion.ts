"use client";

import type { RefObject } from "react";
import { useEffect, useMemo, useRef } from "react";
import { animatePreparedElement } from "../engine/animate.js";
import { isController } from "../engine/controller.js";
import { report } from "../engine/errors.js";
import { observeInView } from "../engine/in-view.js";
import type { AnimationHandle, Timing } from "../engine/types.js";
import { bindControlledScroll } from "../internal/playback.js";
import { dataKey, parseData } from "../internal/stable.js";
import type { MotionProps } from "../types.js";
import { useLatest } from "./use-latest.js";
import type { PreparedDefinition } from "./use-prepared-animation.js";

/** Attach effects after commit; cleanup owns every animation, observer, and scroll subscription. */
export function useMotion(
  ref: RefObject<HTMLElement | SVGElement | null>,
  compiled: PreparedDefinition,
  props: Omit<MotionProps, "children" | "definition">,
) {
  const timingKey = useMemo(() => dataKey(props.timing ?? {}), [props.timing]);
  const timing = useMemo(() => parseData<Timing>(timingKey), [timingKey]);

  const handle = useRef<AnimationHandle | null>(null);

  const callbacks = useLatest({
    onError: props.onMotionError,
    onComplete: props.onMotionComplete,
  });

  const input = props.controller,
    imperativeController = isController(input),
    declarative = imperativeController ? undefined : input,
    controls = imperativeController ? input : declarative?.controls;

  const trigger = declarative?.trigger,
    reverse = declarative?.reverse ?? false,
    stopped = declarative?.isAnimationStopped ?? false;

  const view = declarative?.configView,
    scroll = declarative?.scroll;

  const amount = view?.amount,
    once = view?.once,
    margin = view?.margin,
    root = view?.root;

  const source = scroll?.source,
    target = scroll?.target,
    axis = scroll?.axis,
    mode = scroll?.mode,
    start = scroll?.start,
    end = scroll?.end;

  const hasScroll = !!scroll;
  const { elementType, reducedMotion } = props;

  // biome-ignore lint/correctness/useExhaustiveDependencies: The intrinsic tag can replace ref.current without changing ref.
  useEffect(() => {
    if (!ref.current) return;

    const animation = animatePreparedElement(ref.current, compiled, {
      ...timing,
      autoplay: false,
      reducedMotion,
      onError: (error) => report(error, callbacks.current.onError),
      onFinish: (result) => callbacks.current.onComplete?.(result),
    });

    handle.current = animation;

    let unregister: (() => void) | undefined;

    try {
      unregister = controls?.register(animation);
    } catch (error) {
      animation.dispose();

      if (handle.current === animation) {
        handle.current = null;
      }

      throw error;
    }

    return () => {
      unregister?.();
      animation.dispose();

      if (handle.current === animation) {
        handle.current = null;
      }
    };
  }, [ref, elementType, compiled, timing, reducedMotion, callbacks, controls]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Rebind whenever the effect above replaces the handle or element.
  useEffect(() => {
    const animation = handle.current,
      element = ref.current;
    if (!animation || !element) return;
    if (imperativeController) return;

    const commandOwns = () => controls?.getSnapshot() !== undefined;

    if (commandOwns()) return;

    if (stopped) {
      animation.finish();
      return;
    }

    if (hasScroll) {
      try {
        return bindControlledScroll(
          element,
          animation,
          {
            source,
            target,
            axis,
            mode,
            start,
            end,
          },
          controls,
        );
      } catch (error) {
        report(error, callbacks.current.onError);
        animation.finish();
        return;
      }
    }
    const drive = (visible: boolean) => {
      if (commandOwns()) return;
      if (visible) void (reverse ? animation.reverse() : animation.play());
      else if (animation.playState !== "paused")
        void (reverse ? animation.play() : animation.reverse());
    };
    if (trigger !== undefined) {
      drive(trigger);
      return;
    }
    try {
      return observeInView(element, drive, { amount, once, margin, root });
    } catch (error) {
      report(error, callbacks.current.onError);
      animation.finish();
    }
  }, [
    ref,
    elementType,
    compiled,
    timing,
    reducedMotion,
    controls,
    trigger,
    reverse,
    stopped,
    hasScroll,
    source,
    target,
    axis,
    mode,
    start,
    end,
    amount,
    once,
    margin,
    root,
    callbacks,
    imperativeController,
  ]);
  return compiled.initial;
}
