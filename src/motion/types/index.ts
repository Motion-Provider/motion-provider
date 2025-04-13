/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/
// Welcome to the Motion Provider Interfaces
// Author: Burak Bilen
// Warning: Any changes in this file may cause fatal type errors in the application. Be aware.
/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Imports

import { UseInViewOptions } from "motion/react";
import { LinkProps } from "next/link";

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Core Interfaces

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

// Core Config Interfaces

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
  img: string;
}

export interface MotionMovieAnimationsProps
  extends Omit<MotionAnimationProps, "mode"> {
  enter: AnimationKeys[] | AnimationKeys;
  exit: AnimationKeys[] | AnimationKeys;
}

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Core Component Interfaces

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

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Motion Provider Component Interfaces

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Motion Provider Utils Interfaces

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
  error: string;
  src: MotionComponentSources | MotionHooksSources | MotionUtilsSources;
  mod: "error" | "warn";
}

export interface GetSplittedTextProps {
  text: string;
  mode?: SplittedTextModes;
}
export type GetSplittedTextOutputProps = string[];

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Lib Interfaces

export interface AnimationLibraryProps {
  [key: string]: {
    initial: AnimationObjProps;
    animate: AnimationObjProps;
  };
}

export interface TransitionConfig {
  duration?: number;
  ease?: string | number[];
  delay?: number;
}

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Hook Interfaces

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
  [key: string]: any;
}

export interface UseAnimationMixerProps {
  animations: AnimationLibraryProps[] | AnimationLibraryProps;
  reverse?: boolean;
}

export interface UseOutputAnimationMixerProps {
  initial: AnimationObjProps;
  animate: AnimationObjProps;
}

export type UseAnimationControlProps = Partial<UseAnimationProps>;

export interface UseAnimationExitProps {}
/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Namespace Types

// Strings
export type MotionComponentSources =
  | "MotionContainer"
  | "MotionImage"
  | "MotionMovie"
  | "MotionChain"
  | "MotionText";
export type MotionHooksSources = "useAnimationMixer" | "useAnimation";
export type MotionUtilsSources =
  | "getSplittedText"
  | "getRandomAnimation"
  | "calculateDelay";
export type MotionEngineType = "container" | "text" | "queue";
export type ImageMotionFnTypes = "hover" | "click";
export type SplittedTextModes = "words" | "chars";

// Numbers
export type MotionTextConfigSpaceProps = 0.25 | 0.5 | 0.75 | 1 | 2 | 3 | 4 | 5;
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

// Datasets
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
  | "easeIn"
  | "easeOut"
  | "linear"
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
  | "fadeRotate";
