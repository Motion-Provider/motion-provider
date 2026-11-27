import {
  animationModes,
  delayLogics,
  transitions,
} from "motion-provider/catalog";
import type { TransitionKeys, MotionAnimationProps } from "motion-provider";
import type {
  ComponentKind,
  Easing,
  MotionSettings,
} from "../types/playground";

function option<T extends string>(id: T) {
  const words = id.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
  return { id, label: words.charAt(0).toUpperCase() + words.slice(1) };
}

export const MAX_MODES = 5;
export const PRESETS = animationModes
  .filter((id) => id !== "default")
  .map(option);
export const TRANSITIONS = [
  { id: "custom" as const, label: "Custom timing" },
  ...(Object.keys(transitions) as TransitionKeys[]).map(option),
];

export const EASINGS = {
  "ease-out": { label: "Ease out", value: "ease-out" },
  "ease-in-out": { label: "Ease in-out", value: "ease-in-out" },
  linear: { label: "Linear", value: "linear" },
  snappy: { label: "Snappy", value: [0.23, 1, 0.32, 1] },
  smooth: { label: "Smooth", value: [0.65, 0, 0.35, 1] },
} as const satisfies Record<
  Easing,
  { label: string; value: MotionAnimationProps["easing"] }
>;

export const ORDERS = delayLogics.filter((id) => id !== "custom").map(option);

export const MAX_STAGGER_DELAY = 3;

export function settingsFor(kind: ComponentKind): MotionSettings {
  return {
    modes: [kind === "MotionImage" ? "filterBlurIn" : "fadeUp"],
    transition: "custom",
    duration: 0.6,
    delay: 0,
    easing: "ease-out",
    split: "words",
    stagger: 0.08,
    order: "linear",
    pieces: 16,
    interaction: "auto",
  };
}
