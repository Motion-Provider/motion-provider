import { TransitionConfig } from "../types";

const transitions: { [key: string]: TransitionConfig } = {
  none: {},
  // Do not remove the default from this file.
  default: { duration: 1, ease: "easeInOut" },
  smooth: { duration: 1, ease: "easeInOut" },
  easeIn: { duration: 0.6, ease: "easeIn" },
  easeOut: { duration: 0.6, ease: "easeOut" },
  linear: { duration: 0.6, ease: "linear" },
  cubicSmooth: { duration: 0.6, ease: [0.17, 0.67, 0.83, 0.67] },
  cubicFastStart: { duration: 0.6, ease: [0.55, 0.085, 0.68, 0.53] },
  cubicFastEnd: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  cubicBounce: { duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] },
  cubicElastic: { duration: 0.8, ease: [0.47, 1.64, 0.41, 0.8] },
  slowSmooth: { duration: 1.5, ease: "easeInOut" },
  slowCubic: { duration: 1.5, ease: [0.17, 0.55, 0.55, 1] },
  slowElastic: { duration: 2, ease: [0.47, 1.64, 0.41, 0.8] },
  quickEaseInOut: { duration: 0.3, ease: "easeInOut" },
  quickBounce: { duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] },
  delayedSmooth: { duration: 0.6, ease: "easeInOut" },
  delayedCubic: { duration: 0.6, ease: [0.17, 0.55, 0.55, 1] },
  delayedElastic: { duration: 0.8, ease: [0.47, 1.64, 0.41, 0.8] },
  fadeSlide: { duration: 0.6, ease: "easeInOut" },
  fadeScale: { duration: 0.6, ease: "easeInOut" },
  fadeRotate: { duration: 0.6, ease: "easeInOut" },
};

export default transitions;
