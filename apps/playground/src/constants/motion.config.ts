import type { MotionAnimationProps } from "motion-provider";
import type {
  ComponentKind,
  Easing,
  MotionSettings,
} from "../types/playground";

export const PRESETS = [
  { id: "fadeUp", label: "Fade up" },
  { id: "fadeIn", label: "Fade in" },
  { id: "fadeDown", label: "Fade down" },
  { id: "fadeLeft", label: "Fade left" },
  { id: "fadeRight", label: "Fade right" },
  { id: "slideUp", label: "Slide up" },
  { id: "scaleZoomIn", label: "Scale in" },
  { id: "filterBlurIn", label: "Blur in" },
  { id: "rotateIn", label: "Rotate in" },
  { id: "clipCircle", label: "Circle reveal" },
  { id: "transformRevealUp", label: "Reveal up" },
] as const;

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

export const ORDERS = [
  { id: "linear", label: "In order" },
  { id: "wave", label: "Wave" },
  { id: "shuffle", label: "Shuffle" },
  { id: "bounce", label: "Bounce" },
] as const;

export const MAX_STAGGER_DELAY = 3;

export function settingsFor(kind: ComponentKind): MotionSettings {
  return {
    preset: kind === "MotionImage" ? "filterBlurIn" : "fadeUp",
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
