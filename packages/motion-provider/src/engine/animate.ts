import { finite, invariant, MotionError, report } from "./errors.js";
import { compileAnimation, compileTracks } from "./keyframes.js";
import { styleOwner } from "./styles.js";
import { resolveTiming } from "./timing.js";
import type {
  AnimateOptions,
  AnimationHandle,
  AnimationModule,
  AnimationResult,
} from "./types.js";

export function prepareAnimation(definition: AnimationModule) {
  const compiled = compileAnimation(definition);
  return { ...compiled, tracks: compileTracks(compiled) };
}

/**
 * @description Animate a DOM node using WAAPI. No React, requestAnimationFrame loop, or physics solver.
 * Completion promises resolve on cancellation as well as completion; disposal is idempotent.
 *
 * @description Keyframe/timing mistakes throw MotionError; unavailable/failed browser effects reveal the
 * destination state and report through onError. Finished effects persist until disposal.
 */
export function animateElement(
  element: HTMLElement | SVGElement,
  definition: AnimationModule,
  options: AnimateOptions = {},
): AnimationHandle {
  return animatePreparedElement(element, prepareAnimation(definition), options);
}

export function animatePreparedElement(
  element: HTMLElement | SVGElement,
  compiled: ReturnType<typeof prepareAnimation>,
  options: AnimateOptions = {},
): AnimationHandle {
  invariant(
    element?.style,
    "INVALID_TARGET",
    "animateElement requires an HTML or SVG element.",
  );

  const timing = resolveTiming(options),
    owner = styleOwner(element),
    duration = Number(timing.duration) / 1e3;
  const endTime = Math.max(
    0,
    Number(timing.delay) +
      Number(timing.duration) *
        (Number.isFinite(timing.iterations) ? Number(timing.iterations) : 1) +
      Number(timing.endDelay),
  );

  let effects: Animation[] = [],
    disposed = false,
    attemptedNativeEffects = false,
    backwards = false,
    seekPosition: number | undefined,
    playbackRate = 1,
    state: AnimationPlayState = "paused";

  let resolve: (result: AnimationResult) => void = () => {},
    settled = true;

  let promise: Promise<AnimationResult> = Promise.resolve({
    status: "finished",
  });

  const media =
    options.reducedMotion === undefined || options.reducedMotion === "user"
      ? element.ownerDocument.defaultView?.matchMedia?.(
          "(prefers-reduced-motion: reduce)",
        )
      : undefined;

  let reduced = options.reducedMotion === "always" || !!media?.matches;

  const settle = (status: AnimationResult["status"]) => {
    if (settled) return;

    settled = true;

    const result = {
      status,
    };

    resolve(result);

    if (!disposed) options.onFinish?.(result);
  };

  const begin = () => {
    settle("cancelled");
    settled = false;
    promise = new Promise((r) => {
      resolve = r;
    });
  };

  const staticFinish = () => {
    owner.set(backwards ? compiled.initial : compiled.final);
    state = "finished";
    settle("finished");
  };

  const observed = new WeakSet<Promise<Animation>>();
  const observeRejection = (effect: Animation) => {
    const finished = effect.finished;
    if (observed.has(finished)) return;
    observed.add(finished);
    void finished.catch(() => {});
  };
  const observeRejections = () => {
    for (const effect of effects) observeRejection(effect);
  };

  const releaseEffects = () => {
    for (const effect of effects) {
      effect.onfinish = null;
      effect.cancel();
    }
    effects = [];
  };

  const ensureEffects = () => {
    if (reduced || attemptedNativeEffects) return;
    attemptedNativeEffects = true;

    try {
      if (typeof element.animate !== "function") {
        options.onError?.(
          new MotionError(
            "WAAPI_UNAVAILABLE",
            "WAAPI is unavailable; the destination state is shown.",
          ),
        );
        return;
      }
      for (const frames of compiled.tracks) {
        const effect = element.animate(frames, timing);

        observeRejection(effect);

        effects.push(effect);
        effect.pause();
        observeRejection(effect);
        effect.currentTime = 0;
        if (playbackRate !== 1) effect.playbackRate = playbackRate;

        effect.onfinish = () => {
          if (effects.every((a) => a.playState === "finished")) {
            state = "finished";
            settle("finished");
          }
        };
      }
    } catch (cause) {
      releaseEffects();
      report(
        new MotionError(
          "WAAPI_FAILED",
          "The browser rejected the animation. The destination state is shown.",
          { cause },
        ),
        options.onError,
      );
    }
  };

  const run = (reverse: boolean, fromTime?: number) => {
    if (fromTime !== undefined) finite(fromTime, "reverse time", 0);
    if (disposed)
      return Promise.resolve<AnimationResult>({
        status: "cancelled",
      });

    ensureEffects();
    seekPosition = undefined;
    const changing = backwards !== reverse;

    backwards = reverse;

    if (!changing && state === "running" && fromTime === undefined)
      return promise;

    const resuming =
      !changing && state === "paused" && !settled && fromTime === undefined;

    if (!resuming) begin();

    state = "running";

    if (!effects.length) {
      staticFinish();
      return promise;
    }

    owner.restore();

    for (const effect of effects) {
      if (fromTime !== undefined) effect.currentTime = fromTime * 1000;

      const current = Number(effect.currentTime ?? 0);

      if (reverse && current <= 0) effect.currentTime = endTime;
      if (!reverse && effect.playState === "finished" && current >= endTime) {
        effect.currentTime = 0;
      }

      effect.playbackRate =
        (reverse ? -1 : 1) * (Math.abs(effect.playbackRate) || 1);

      effect.play();
    }

    observeRejections();

    return promise;
  };

  const handle: AnimationHandle = {
    get finished() {
      return promise;
    },
    get playState() {
      return state;
    },
    duration,
    get currentTime() {
      return (
        Math.max(
          0,
          ...effects.map((effect) => Number(effect.currentTime ?? 0)),
        ) / 1000
      );
    },
    get totalDuration() {
      return timing.iterations === Infinity ? Infinity : endTime / 1000;
    },
    play: () => run(false),
    reverse: (fromTime) => run(true, fromTime),
    pause() {
      if (!disposed) {
        for (const effect of effects) effect.pause();
        observeRejections();
        state = "paused";
      }
    },
    finish() {
      if (disposed) return;
      seekPosition = undefined;
      if (!effects.length) {
        staticFinish();
        return;
      }
      if (timing.iterations === Infinity) {
        for (const effect of effects) effect.cancel();
        staticFinish();
        return;
      }
      for (const effect of effects) effect.finish();
      state = "finished";
      settle("finished");
    },
    cancel() {
      if (!disposed) {
        seekPosition = undefined;
        for (const effect of effects) effect.cancel();
        owner.restore();
        state = "idle";
        settle("cancelled");
      }
    },
    reset() {
      if (disposed) return;
      seekPosition = undefined;
      settle("cancelled");
      backwards = false;
      playbackRate = Math.abs(playbackRate) || 1;
      state = "paused";
      for (const effect of effects) {
        effect.pause();
        effect.currentTime = 0;
        effect.playbackRate = Math.abs(effect.playbackRate) || 1;
      }
      if (!effects.length) owner.set(compiled.initial);
      observeRejections();
    },
    seek(progress) {
      finite(progress, "progress");
      if (disposed) return;
      invariant(
        timing.iterations !== Infinity,
        "INFINITE_SEEK",
        "Normalized seeking requires finite iterations.",
      );
      const position = Math.max(0, Math.min(1, progress));
      seekPosition = position;
      const wasStatic = !effects.length;
      ensureEffects();
      if (wasStatic && effects.length) owner.restore();
      for (const effect of effects) {
        effect.pause();
        effect.currentTime = position * endTime;
      }
      observeRejections();
      state = "paused";
      if (!effects.length)
        owner.set(position === 0 ? compiled.initial : compiled.final);
    },
    setPlaybackRate(rate) {
      finite(rate, "playbackRate");
      if (disposed) return;
      playbackRate = rate;
      for (const effect of effects) effect.updatePlaybackRate(rate);
      backwards = rate < 0;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      releaseEffects();
      owner.restore();
      state = "idle";
      settle("cancelled");
      media?.removeEventListener("change", onPreference);
    },
  };

  function onPreference(event: MediaQueryListEvent) {
    if (disposed || reduced === event.matches) return;
    reduced = event.matches;
    if (reduced) {
      if (effects.length) {
        releaseEffects();
        attemptedNativeEffects = false;
      }
      if (seekPosition === undefined) staticFinish();
      else {
        handle.seek(seekPosition);
        settle("finished");
      }
    } else if (seekPosition !== undefined) handle.seek(seekPosition);
  }

  ensureEffects();
  media?.addEventListener("change", onPreference);

  if (options.autoplay !== false) {
    void handle.play();
  } else if (!effects.length) {
    owner.set(reduced ? compiled.final : compiled.initial);
  }

  return handle;
}
