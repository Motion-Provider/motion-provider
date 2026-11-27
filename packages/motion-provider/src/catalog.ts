import animations from "./constants/animations.js";
import type { AnimationKeys } from "./types.js";

export const animationModes = Object.keys(animations) as AnimationKeys[];
export { default as transitions } from "./constants/transitions.js";
export { default as delayLogics } from "./constants/delays.js";
export { calculateDelays } from "./utils.js";
