import { TransitionsLib } from "../types";

const transitions = {
  default: { duration: 1, ease: "easeInOut" }, // never remove or you die!

  // core
  smooth: { duration: 1, ease: "easeInOut" },
  linear: { duration: 0.6, ease: "linear" },
  easeIn: { duration: 0.6, ease: "easeIn" },
  easeOut: { duration: 0.6, ease: "easeOut" },
  easeInOut: { duration: 0.7, ease: "easeInOut" },

  // cubic
  cubicSmooth: { duration: 0.6, ease: [0.17, 0.67, 0.83, 0.67] },
  cubicFastStart: { duration: 0.6, ease: [0.55, 0.085, 0.68, 0.53] },
  cubicFastEnd: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  cubicBounce: { duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] },
  cubicElastic: { duration: 0.8, ease: [0.47, 1.64, 0.41, 0.8] },

  // slow
  slowCubic: { duration: 1.5, ease: [0.17, 0.55, 0.55, 1] },

  // semantic
  fadeSlide: { duration: 0.7, ease: "circOut" },
  fadeScale: { duration: 0.6, ease: "backOut" },
  fadeRotate: { duration: 0.8, ease: "anticipate" },

  // expressive
  gentle: { duration: 0.9, ease: [0.22, 0.9, 0.36, 0.99] },
  snappy: { duration: 0.35, ease: [0.33, 1.2, 0.67, 1] },
  pop: { duration: 0.42, ease: [0.34, 1.56, 0.64, 1] },
  float: { duration: 1.1, ease: [0.2, 1, 0.2, 1] },
  bounceSoft: { duration: 0.7, ease: [0.25, 0.8, 0.3, 1.2] },
  bounceHard: { duration: 0.5, ease: [0.68, -0.6, 0.32, 1.6] },
  linger: { duration: 1.3, ease: [0.17, 0.67, 0.6, 1] },
  rush: { duration: 0.22, ease: [0.5, 0, 0.75, 0.35] },
  elasticSoft: { duration: 1.2, ease: [0.2, 1.4, 0.3, 1] },
  elasticHard: { duration: 0.9, ease: [0.47, 2.2, 0.3, 1.1] },
  springy: { duration: 0.85, ease: [0.25, 1.6, 0.5, 1] },
  sudden: { duration: 0.15, ease: [0.75, 0, 0.9, 0.2] },
  smoothFast: { duration: 0.45, ease: [0.08, 0.95, 0.15, 1] },
  overshoot: { duration: 0.7, ease: "backInOut" },
  settle: { duration: 1.1, ease: "circInOut" },
} as const satisfies TransitionsLib;

export default transitions;
export type TransitionKeys = keyof typeof transitions;
