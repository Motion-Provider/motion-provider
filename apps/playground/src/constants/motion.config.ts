import type { MotionAnimationProps, TransitionKeys } from "motion-provider";
import {
  animationModes,
  delayLogics,
  transitions,
} from "motion-provider/catalog";
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
].filter((t) => t.id !== "default");

export const EASINGS = {
  ease: { label: "Ease", value: "ease" },
  "ease-in": { label: "Ease in", value: "ease-in" },
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

export const FILLS = (
  ["auto", "none", "forwards", "backwards", "both"] as const
).map(option);
export const MAX_LAYER_DELAY = 2;

export function settingsFor(kind: ComponentKind): MotionSettings {
  return {
    modes: [kind === "MotionImage" ? "filterBlurIn" : "fadeUp"],
    transition: "custom",
    duration: 0.6,
    delay: 0,
    easing: "ease-out",
    easingProperty: "easing",
    endDelay: 0,
    fill: "both",
    split: "words",
    stagger: 0.08,
    order: "linear",
    maxDelay: 3,
    seed: 42,
    pieces: 16,
    interaction: "auto",
  };
}
