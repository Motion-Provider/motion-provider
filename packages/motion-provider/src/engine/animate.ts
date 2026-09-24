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
	invariant(
		element?.style,
		"INVALID_TARGET",
		"animateElement requires an HTML or SVG element.",
	);

	const compiled = compileAnimation(definition),
		timing = resolveTiming(options);
	const owner = styleOwner(element);
	const duration = Number(timing.duration) / 1e3;

	let effects: Animation[] = [],
		disposed = false,
		backwards = false,
		state: AnimationPlayState = "paused";

	let resolve: (result: AnimationResult) => void = () => {},
		settled = true;

	let promise: Promise<AnimationResult> = Promise.resolve({
		status: "finished",
	});

	const media =
		options.reducedMotion !== "never"
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

	const observeRejections = () => {
		for (const effect of effects) void effect.finished.catch(() => {});
	};

	try {
		if (!reduced && typeof element.animate === "function") {
			for (const frames of compileTracks(compiled)) {
				const effect = element.animate(frames, timing);
				// Attach immediately, cancellation during Strict Mode must never reject unobserved.
				void effect.finished.catch(() => {});

				effects.push(effect);
				effect.pause();
				effect.currentTime = 0;

				effect.onfinish = () => {
					if (effects.every((a) => a.playState === "finished")) {
						state = "finished";
						settle("finished");
					}
				};
			}
		} else if (!reduced) {
			options.onError?.(
				new MotionError(
					"WAAPI_UNAVAILABLE",
					"WAAPI is unavailable; the destination state is shown.",
				),
			);
		}
	} catch (cause) {
		for (const effect of effects) effect.cancel();

		effects = [];

		report(
			new MotionError(
				"WAAPI_FAILED",
				"The browser rejected the animation. The destination state is shown.",
				{
					cause,
				},
			),
			options.onError,
		);
	}

	const endTime = () =>
		Math.max(
			0,
			Number(timing.delay) +
				Number(timing.duration) *
					(Number.isFinite(timing.iterations) ? Number(timing.iterations) : 1) +
				Number(timing.endDelay),
		);

	const run = (reverse: boolean, fromTime?: number) => {
		if (fromTime !== undefined) finite(fromTime, "reverse time", 0);
		if (disposed)
			return Promise.resolve<AnimationResult>({
				status: "cancelled",
			});

		const changing = backwards !== reverse;

		backwards = reverse;

		if (!changing && state === "running" && fromTime === undefined)
			return promise;

		const resuming =
			!changing && state === "paused" && !settled && fromTime === undefined;

		if (!resuming) begin();

		state = "running";

		if (!effects.length || reduced) {
			for (const effect of effects) effect.cancel();
			staticFinish();
			return promise;
		}

		owner.restore();

		for (const effect of effects) {
			if (fromTime !== undefined) effect.currentTime = fromTime * 1000;

			const current = Number(effect.currentTime ?? 0);

			if (reverse && current <= 0) effect.currentTime = endTime();
			if (!reverse && effect.playState === "finished" && current >= endTime()) {
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
			return timing.iterations === Infinity ? Infinity : endTime() / 1000;
		},
		play: () => run(false),
		reverse: (fromTime) => run(true, fromTime),
		pause() {
			if (!disposed) {
				for (const effect of effects) effect.pause();
				state = "paused";
			}
		},
		finish() {
			if (disposed) return;
			if (!effects.length || reduced) {
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
				for (const effect of effects) effect.cancel();
				owner.restore();
				state = "idle";
				settle("cancelled");
			}
		},
		reset() {
			if (disposed) return;
			settle("cancelled");
			backwards = false;
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
			for (const effect of effects) {
				effect.pause();
				effect.currentTime = Math.max(0, Math.min(1, progress)) * endTime();
			}
			state = "paused";
			if (!effects.length)
				owner.set(progress <= 0 ? compiled.initial : compiled.final);
		},
		setPlaybackRate(rate) {
			finite(rate, "playbackRate");
			if (disposed) return;
			for (const effect of effects) effect.updatePlaybackRate(rate);
			backwards = rate < 0;
		},
		dispose() {
			if (disposed) return;
			disposed = true;
			for (const effect of effects) effect.cancel();
			owner.restore();
			state = "idle";
			settle("cancelled");
			for (const effect of effects) effect.onfinish = null;
			effects = [];
			media?.removeEventListener("change", onPreference);
		},
	};

	function onPreference(event: MediaQueryListEvent) {
		reduced = options.reducedMotion === "always" || event.matches;
		if (reduced) {
			for (const effect of effects) effect.cancel();
			staticFinish();
		}
	}

	media?.addEventListener("change", onPreference);

	if (options.autoplay !== false) {
		void handle.play();
	} else if (!effects.length) {
		owner.set(reduced ? compiled.final : compiled.initial);
	}

	return handle;
}
