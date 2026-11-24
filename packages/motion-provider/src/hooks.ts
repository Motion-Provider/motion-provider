"use client";

import { useMemo, useState } from "react";
import { createController } from "./engine/controller.js";
import { mixAnimations } from "./engine/keyframes.js";
import type { AnimationController, AnimationModule } from "./types.js";

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
