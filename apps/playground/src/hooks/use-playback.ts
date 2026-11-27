"use client";

import { type AnimationController, useController } from "motion-provider";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Handle = Parameters<AnimationController["register"]>[0];
type Position = { current: number; state: "idle" | "playing" | "paused" };

export function usePlayback(total: number, playbackKey: string) {
  const base = useController();
  const passive = useController({ stopAnimation: true });

  const handles = useRef(new Set<Handle>());
  const run = useRef(0);
  const frame = useRef<number | undefined>(undefined);
  const position = useRef<Position>({ current: 0, state: "idle" });
  const [display, setDisplay] = useState<Position>(position.current);

  const controller = useMemo<AnimationController>(
    () => ({
      ...base,
      register(handle) {
        const unregister = base.register(handle);
        handles.current.add(handle);

        const { state, current } = position.current;
        if (state === "idle") handle.finish();
        else {
          if (handle.totalDuration > 0)
            handle.seek(current / handle.totalDuration);
          if (state === "playing" && current < handle.totalDuration)
            void handle.play();
        }

        return () => {
          handles.current.delete(handle);
          unregister();
        };
      },
      get size() {
        return handles.current.size;
      },
    }),
    [base],
  );

  const update = useCallback((next: Position) => {
    position.current = next;
    setDisplay(next);
  }, []);

  const stopFrame = useCallback(() => {
    run.current += 1;
    if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    frame.current = undefined;
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Restart playback when the project or its duration changes.
  useEffect(() => {
    stopFrame();
    for (const handle of handles.current) handle.finish();
    update({ current: 0, state: "idle" });

    return stopFrame;
  }, [playbackKey, total, stopFrame, update]);

  const pause = useCallback(() => {
    if (position.current.state !== "playing") return;

    stopFrame();
    for (const handle of handles.current) handle.pause();
    update({ current: position.current.current, state: "paused" });
  }, [stopFrame, update]);

  const seek = useCallback(
    (time: number) => {
      stopFrame();
      for (const handle of handles.current) {
        if (handle.totalDuration > 0) handle.seek(time / handle.totalDuration);
      }

      update({ current: time, state: "paused" });
    },
    [stopFrame, update],
  );

  const play = useCallback(
    (restart = false) => {
      if (total <= 0) return;

      stopFrame();
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        for (const handle of handles.current) handle.finish();
        update({ current: total, state: "idle" });
        return;
      }

      const from =
        restart ||
        position.current.state === "idle" ||
        position.current.current >= total
          ? 0
          : position.current.current;

      for (const handle of handles.current) {
        if (handle.totalDuration > 0) {
          handle.seek(from / handle.totalDuration);
          if (from < handle.totalDuration) void handle.play();
        }
      }

      const token = run.current;
      const started = performance.now();
      update({ current: from, state: "playing" });

      function tick(now: number) {
        if (token !== run.current) return;

        const current = Math.min(total, from + (now - started) / 1000);
        update({ current, state: current === total ? "idle" : "playing" });

        if (current < total) frame.current = requestAnimationFrame(tick);
        else frame.current = undefined;
      }

      frame.current = requestAnimationFrame(tick);
    },
    [total, stopFrame, update],
  );

  const toggle = useCallback(() => {
    if (position.current.state === "playing") pause();
    else play();
  }, [pause, play]);

  return { controller, passive, display, play, toggle, seek };
}
