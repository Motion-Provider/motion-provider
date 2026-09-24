import { finite, invariant } from "./errors.js";
import type { Easing, Timing } from "./types.js";

const aliases: Record<string, string> = {
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	backIn: "cubic-bezier(.6,-.28,.735,.045)",
	backOut: "cubic-bezier(.175,.885,.32,1.275)",
	backInOut: "cubic-bezier(.68,-.55,.265,1.55)",
	anticipate: "cubic-bezier(.68,-.6,.32,1)",
	circIn: "cubic-bezier(.55,0,1,.45)",
	circOut: "cubic-bezier(0,.55,.45,1)",
	circInOut: "cubic-bezier(.85,0,.15,1)",
};

/** Named Motion easings become CSS curves without spring solver. */
export function resolveEasing(easing: Easing = "ease-in-out"): string {
	if (typeof easing === "string") {
		invariant(easing.trim(), "INVALID_EASING", "Easing cannot be empty.");
		return aliases[easing] ?? easing;
	}

	invariant(
		easing.length === 4 &&
			easing.every(Number.isFinite) &&
			easing[0] >= 0 &&
			easing[0] <= 1 &&
			easing[2] >= 0 &&
			easing[2] <= 1,
		"INVALID_EASING",
		"A cubic Bézier needs four finite numbers; x coordinates must be in [0, 1].",
	);

	return `cubic-bezier(${easing.join(",")})`;
}

/** Normalize timing without truthiness defaults, preserving explicit zero durations/delays. */
export function resolveTiming(timing: Timing = {}): KeyframeAnimationOptions {
	const iterations = timing.iterations ?? 1;

	invariant(
		iterations === Infinity || (Number.isFinite(iterations) && iterations >= 0),
		"INVALID_ITERATIONS",
		"iterations must be nonnegative or Infinity.",
	);

	const direction = timing.direction ?? "normal";
	const fill = timing.fill ?? "both";

	invariant(
		["normal", "reverse", "alternate", "alternate-reverse"].includes(direction),
		"INVALID_DIRECTION",
		"Unknown playback direction.",
	);

	invariant(
		["auto", "none", "forwards", "backwards", "both"].includes(fill),
		"INVALID_FILL",
		"Unknown fill mode.",
	);

	return {
		duration: finite(timing.duration ?? 1, "duration", 0) * 1000,
		delay: finite(timing.delay ?? 0, "delay") * 1000,
		endDelay: finite(timing.endDelay ?? 0, "endDelay") * 1000,
		easing: resolveEasing(timing.easing ?? timing.ease),
		iterations,
		direction,
		fill,
	};
}
