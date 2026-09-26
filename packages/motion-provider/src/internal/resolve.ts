import animations from "../constants/animations.js";
import transitions from "../constants/transitions.js";
import { invariant } from "../engine/errors.js";
import { mixAnimations } from "../engine/keyframes.js";
import type {
  AnimationModule,
  MotionAnimationProps,
  Timing,
} from "../types.js";

/**
 * @description Resolves the compatibility registry at the React adapter boundary,
 * never in the core engine.
 *
 */
export function resolveAnimation(animation: MotionAnimationProps): {
  definition: AnimationModule;
  timing: Timing;
} {
  invariant(
    animation?.mode,
    "MISSING_ANIMATION",
    "An animation with a mode is required.",
  );
  const list = Array.isArray(animation.mode)
    ? animation.mode
    : [animation.mode];

  const definition = mixAnimations(
    list.map((mode) => {
      if (typeof mode !== "string") return mode as AnimationModule;
      invariant(
        Object.hasOwn(animations, mode),
        "UNKNOWN_MODE",
        `Unknown animation mode "${mode}".`,
      );
      return animations[mode as keyof typeof animations];
    }),
  );

  const { mode: _mode, transition, ...overrides } = animation;

  if (typeof transition === "string")
    invariant(
      Object.hasOwn(transitions, transition),
      "UNKNOWN_TRANSITION",
      `Unknown transition "${transition}".`,
    );

  const preset =
    typeof transition === "object"
      ? transition
      : transitions[transition ?? "default"];
  const timing = {
    ...preset,
    ...Object.fromEntries(
      Object.entries(overrides).filter(([, v]) => v !== undefined),
    ),
  };

  return {
    definition,
    timing,
  };
}
