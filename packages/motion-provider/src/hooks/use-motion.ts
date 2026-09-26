"use client";

import type { RefObject } from "react";
import { useEffect, useMemo, useRef } from "react";
import { animateElement } from "../engine/animate.js";
import { isController } from "../engine/controller.js";
import { report } from "../engine/errors.js";
import { observeInView } from "../engine/in-view.js";
import { bindScroll } from "../engine/scroll.js";
import { dataKey, parseData } from "../internal/stable.js";
import type {
  AnimationHandle,
  AnimationModule,
  MotionProps,
  Timing,
} from "../types.js";
import { useLatest } from "./use-latest.js";
/** Attach effects after commit; cleanup owns every animation, observer, and scroll subscription. */
export function useMotion(
  ref: RefObject<HTMLElement | SVGElement | null>,
  props: Omit<MotionProps, "children">,
): void {
  const key = dataKey({
    definition: props.definition,
    timing: props.timing ?? {},
  });

  const spec = useMemo(
    () =>
      parseData<{
        definition: AnimationModule;
        timing: Timing;
      }>(key),
    [key],
  );

  const handle = useRef<AnimationHandle | null>(null);

  const callbacks = useLatest({
    onError: props.onMotionError,
    onComplete: props.onMotionComplete,
  });

  const input = props.controller;
  const declarative = isController(input) ? undefined : input;
  const controls = isController(input) ? input : declarative?.controls;

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

  const hasScroll = !!scroll,
    reducedMotion = props.reducedMotion;
  useEffect(() => {
    if (!ref.current) return;
    const animation = animateElement(ref.current, spec.definition, {
      ...spec.timing,
      autoplay: false,
      reducedMotion,
      onError: (error) => report(error, callbacks.current.onError),
      onFinish: (result) => callbacks.current.onComplete?.(result),
    });
    handle.current = animation;
    return () => {
      animation.dispose();
      if (handle.current === animation) handle.current = null;
    };
  }, [ref, spec, reducedMotion, callbacks]);

  useEffect(() => {
    if (!handle.current || !controls) return;
    return controls.register(handle.current);
  }, [controls]);

  useEffect(() => {
    const animation = handle.current,
      element = ref.current;
    if (!animation || !element) return;
    const commandOwns = () => controls?.getSnapshot() !== undefined;

    if (commandOwns()) return;

    if (stopped) {
      animation.finish();
      return;
    }

    if (hasScroll) {
      try {
        return bindScroll(
          element,
          {
            seek: (progress) => {
              if (!commandOwns()) animation.seek(progress);
            },
          },
          {
            source,
            target,
            axis,
            mode,
            start,
            end,
          },
        );
      } catch (error) {
        report(error, callbacks.current.onError);
        animation.finish();
        return;
      }
    }
    const show = () => {
      if (!commandOwns())
        void (reverse ? animation.reverse() : animation.play());
    };
    if (trigger !== undefined) {
      if (trigger) show();
      else if (animation.playState !== "paused") void animation.reverse();
      return;
    }
    try {
      return observeInView(
        element,
        (visible) => {
          if (commandOwns()) return;
          if (visible) show();
          else if (animation.playState !== "paused")
            void (reverse ? animation.play() : animation.reverse());
        },
        {
          amount,
          once,
          margin,
          root,
        },
      );
    } catch (error) {
      report(error, callbacks.current.onError);
      animation.finish();
    }
  }, [
    ref,
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
  ]);
}
