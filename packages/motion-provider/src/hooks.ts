"use client";

import { useMemo, useState } from "react";
import { createController, isController } from "./engine/controller.js";
import { mixAnimations } from "./engine/keyframes.js";
import type {
	AnimationController,
	AnimationModule,
	MotionControllerProps,
} from "./types.js";

/** Stable component-scoped command store. Strict Mode creates no DOM effects during render. */
export function useController(initial?: {
	stopAnimation?: boolean;
	reverseAnimation?: boolean;
}): AnimationController {
	const [controller] = useState(() => {
		const value = createController();
		if (initial?.stopAnimation) value.finish();
		else if (initial?.reverseAnimation) void value.reverse();
		return value;
	});
	return controller;
}

/** Map old state flags or wire the new controller without subscribing React to playback frames. */
export function useAnimation(
	controller: AnimationController,
): AnimationController;

export function useAnimation(controller: {
	stopAnimation?: boolean;
	reverseAnimation?: boolean;
}): MotionControllerProps;

export function useAnimation(
	controller:
		| AnimationController
		| {
				stopAnimation?: boolean;
				reverseAnimation?: boolean;
		  },
): AnimationController | MotionControllerProps {
	return isController(controller)
		? controller
		: {
				isAnimationStopped: controller.stopAnimation ?? false,
				reverse: controller.reverseAnimation ?? false,
			};
}

/** Compatibility hook; onStop now finishes immediately, with no arbitrary 500ms state timer. */
export const useAnimationControl = useController;

/** Pure preset mixing retained for custom adapters. Duplicate CSS properties use the last mode. */
export function useAnimationMixer({
	animations,
	reverse = false,
}: {
	animations: AnimationModule | readonly AnimationModule[];
	reverse?: boolean;
}): AnimationModule {
	return useMemo(() => {
		const result = mixAnimations(animations);
		return reverse
			? {
					initial: result.animate,
					animate: result.initial,
				}
			: result;
	}, [animations, reverse]);
}
