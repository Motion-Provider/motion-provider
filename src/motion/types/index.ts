/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/
// Welcome to the Motion Provider Interfaces
// Author: Burak Bilen
// Warning: Any changes in this file may cause fatal type errors in the application. Be aware.
/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Imports

import { EasingDefinition, UseInViewOptions } from "motion/react";

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Cores

export interface MotionControllerProps {
  configView?: UseInViewOptions;
  trigger?: boolean;
  isAnimationStopped?: boolean;
  reverse?: boolean;
}

export interface MotionAnimationProps {
  mode: AnimationKeys | AnimationKeys[];
  transition: TransitionKeys;
  delay?: number;
  duration?: number;
}

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Configs

export interface MotionChainConfigProps {
  delayByElement?: number;
  isDynamicallyQueued?: boolean;
  delayLogic?: DelayLogic;
  customLogic?: (index: number) => number;
  duration: number;
}

export interface MotionTextConfigProps extends MotionChainConfigProps {
  mode: SplittedTextModes;
  space?: MotionTextConfigSpaceProps;
}

export interface MotionImageConfigProps extends MotionChainConfigProps {
  pieces: ImageMotionPieces;
  fn?: ImageMotionFnTypes;
  img?: string;
}

export interface MotionMovieAnimationsProps
  extends Omit<MotionAnimationProps, "mode"> {
  enter: AnimationKeys[] | AnimationKeys;
  exit: AnimationKeys[] | AnimationKeys;
}

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Core Components

export interface MotionContainerProps {
  controller?: MotionControllerProps;
  animation: MotionAnimationProps;
  children?: React.ReactNode;
  className?: string;
  elementType: React.ElementType;
}

export interface MotionChainProps {
  controller?: MotionControllerProps;
  animations: MotionAnimationProps[];
  config: MotionChainConfigProps;
  children: React.ReactNode[];
  className?: string;
  elementType: React.ElementType;
}

export interface MotionTextProps {
  animation: MotionAnimationProps;
  config: MotionTextConfigProps;
  controller?: MotionControllerProps;
  elementType: React.ElementType;
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

export interface MotionImageProps {
  animation: MotionAnimationProps;
  className?: string;
  fallback?: React.ReactNode;
  wrapperClassName?: string;
  config: Omit<MotionImageConfigProps, "isDynamicallyQueued">;
  controller?: MotionControllerProps;
}

export interface MotionMovieProps {
  animations: MotionMovieAnimationsProps;
  controller?: MotionControllerProps;
  config: Omit<
    MotionImageConfigProps,
    "isDynamicallyQueued" | "duration" | "img"
  > & {
    images: string[];
    animationDuration: number;
  };
  fallback?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

export interface MotionLinkProps {
  timer: number;
  href: string;
  className?: string;
  onReverse: () => void;
  children: React.ReactNode;
}
/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Utils

export interface CalculateDelayProps {
  delayLogic: DelayLogic;
  index: number;
  baseDuration: number;
  customLogic?: (index: number) => number;
}

export type GetRandomAnimation = AnimationKeys[] | AnimationKeys | undefined;
export interface GetRandomAnimationProps {
  count: number;
}

export interface GetErrorLogsProps {
  msg: string;
  src: MotionComponentSources | MotionHooksSources | MotionUtilsSources;
  mod: "error" | "warn";
}

export interface GetSplittedTextProps {
  text: string;
  mode?: SplittedTextModes;
}
export type GetSplittedTextOutputProps = string[];

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Libs

export interface AnimationLibraryProps {
  [key: string]: {
    initial: AnimationObjProps;
    animate: AnimationObjProps;
  };
}

export type AnimationModule = {
  initial: AnimationObjProps;
  animate: AnimationObjProps;
};
export interface TransitionConfig {
  duration?: number;
  ease?: EasingDefinition | number[];
  delay?: number;
}

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Hooks

export interface UseAnimationProps {
  stopAnimation: boolean;
  reverseAnimation?: boolean;
}

export interface UseAnimationStateProps {
  isAnimationStopped: boolean;
  reverse: boolean;
}

export type UseAnimationActionTypes =
  | { type: "IMMEDIATE_STOP" }
  | { type: "FOLLOW_STOP" }
  | { type: "IMMEDIATE_RESET" }
  | { type: "FOLLOW_RESET" }
  | { type: "UPDATE"; payload: { reverseAnimation: boolean } };

export interface AnimationObjProps {
  [key: string]: unknown;
}

export interface UseAnimationMixerProps {
  animations: AnimationModule[] | AnimationModule;
  reverse?: boolean;
}

export interface UseOutputAnimationMixerProps {
  initial: AnimationObjProps;
  animate: AnimationObjProps;
}

export type UseAnimationControlProps = Partial<UseAnimationProps>;

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Namespaces

export type MotionComponentSources =
  | "MotionContainer"
  | "MotionImage"
  | "MotionMovie"
  | "MotionChain"
  | "MotionText"
  | "CoreMotion";
export type MotionHooksSources = "useAnimationMixer" | "useAnimation";
export type MotionUtilsSources =
  | "getSplittedText"
  | "getRandomAnimation"
  | "calculateDelay";
export type MotionEngineType = "container" | "text" | "queue";
export type ImageMotionFnTypes = "hover" | "click";
export type SplittedTextModes = "words" | "chars";

export type MotionTextConfigSpaceProps = number | string;

// Number unions

export type ImageMotionPieces =
  | 16
  | 25
  | 36
  | 49
  | 64
  | 81
  | 100
  | 121
  | 144
  | 169
  | 196
  | 225
  | 256
  | 289
  | 324
  | 361
  | 400;

// string-set unions

export type DelayLogic =
  | "linear"
  | "exponential"
  | "sinusoidal"
  | "custom"
  | "square"
  | "triangle"
  | "sawtooth"
  | "cosine"
  | "fibonacci"
  | "chaos"
  | "pendulum"
  | "perlin"
  | "chaotic"
  | "cumulative"
  | "bounce"
  | "spiral"
  | "quantum";

export type AnimationKeys =
  | "opacity"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "slideUp"
  | "staggeredIn"
  | "staggeredOut"
  | "fadeIn"
  | "fadeOut"
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scaleZoomIn"
  | "scaleZoomOut"
  | "scaleGrowShrink"
  | "rotateIn"
  | "rotateOut"
  | "rotateFlipX"
  | "rotateFlipY"
  | "rotateSwing"
  | "rotateClockwise"
  | "rotateRoll"
  | "rotating360"
  | "bounceY"
  | "bounceX"
  | "rotateBounce"
  | "elasticBounce"
  | "bounceInOut"
  | "burakHeartbeat"
  | "burakRubberBand"
  | "burakWobble"
  | "burakPulse"
  | "skewX"
  | "textShimmer"
  | "swingHorizontal"
  | "flash"
  | "hoverEffect"
  | "wave"
  | "funChickenDance"
  | "funJellyFish"
  | "funRocketBoost"
  | "funDizzyLizard"
  | "funBlobMorph"
  | "funMoonWalk"
  | "funPeekABoo"
  | "funSnailTrail"
  | "funPopcornPop"
  | "funYoYoSpin"
  | "funWarpDrive"
  | "funSpringFling"
  | "funTwinkleToes"
  | "funGhostFloat"
  | "filterBlurIn"
  | "filterBlurOut"
  | "filterBrightnessFade"
  | "filterContrastShift"
  | "filterGrayscaleFade"
  | "filterHueRotate"
  | "filterInvertColors"
  | "filterSaturateIncrease"
  | "filterSepiaTone"
  | "translate3dIn"
  | "translate3dOut"
  | "translate3dRotate"
  | "translate3dZoom"
  | "translate3dBounce"
  | "translate3dWave"
  | "translate3dZigZag"
  | "spin"
  | "drift"
  | "glitch"
  | "slideBounce"
  | "flipCard"
  | "jitter"
  | "flip3D"
  | "neonGlow"
  | "typingEffect"
  | "pathMotion"
  | "jellyTwist"
  | "depthPush"
  | "colorShift"
  | "orbitRotation"
  | "moveToRightBottom"
  | "moveToRightTop"
  | "moveToLeftBottom"
  | "moveToTopCenter"
  | "moveToLeftTop";

export type TransitionKeys =
  | "none"
  | "default"
  | "smooth"
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "cubicSmooth"
  | "cubicFastStart"
  | "cubicFastEnd"
  | "cubicBounce"
  | "cubicElastic"
  | "slowSmooth"
  | "slowCubic"
  | "slowElastic"
  | "quickEaseInOut"
  | "quickBounce"
  | "delayedSmooth"
  | "delayedCubic"
  | "delayedElastic"
  | "fadeSlide"
  | "fadeScale"
  | "fadeRotate"
  | "gentle"
  | "snappy"
  | "pop"
  | "float"
  | "hover"
  | "bounceSoft"
  | "bounceHard"
  | "linger"
  | "rush"
  | "elasticSoft"
  | "elasticHard"
  | "springy"
  | "sudden"
  | "smoothFast"
  | "overshoot"
  | "settle";
