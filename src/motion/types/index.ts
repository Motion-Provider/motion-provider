import { EasingDefinition, UseInViewOptions } from "motion/react";
import { HTMLAttributes } from "react";

export interface MotionControllerProps {
  /**
   * @description
   * Allows you to pass options to the useInView hook,
   * which is used to control the animation with viewport.
   *
   * @see https://motion.dev/docs/react-use-in-view
   */
  configView?: Omit<UseInViewOptions, "root">;
  /**
   * @description
   * An immediate animation caller — if true the relevant
   * MP component won't listen any other prop to start animate
   */
  trigger?: boolean;
  isAnimationStopped?: boolean;
  reverse?: boolean;
}

/**
 * The MotionAnimationProps interface defines properties that can be
 * passed to the MotionContainer component.
 *
 * @typedef {Object} MotionAnimationProps
 * @property {AnimationKeys | AnimationKeys[]} mode - animation mode(s)
 * @property {TransitionKeys} transition - animation transition type
 * @property {number | undefined} [delay] - animation delay
 * @property {number} [duration] - animation duration
 */
export interface MotionAnimationProps {
  /**
   * @description
   */
  mode: AnimationKeys | AnimationKeys[];
  transition: TransitionKeys;
  /**
   * @property {number=} delay of the animation
   */
  delay?: number;
  duration?: number;
}

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Configs

export interface MotionChainConfigProps {
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

type MotionMovieConfigProps = Omit<
  MotionImageConfigProps,
  "duration" | "img"
> & {
  images: string[];
  animationDuration: number;
};

export interface MotionMovieAnimationsProps
  extends Omit<MotionAnimationProps, "mode"> {
  enter: AnimationKeys[] | AnimationKeys;
  exit: AnimationKeys[] | AnimationKeys;
}

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Core Components

type GeneralHTMLAttributes = Omit<HTMLAttributes<HTMLElement>, "children">;

/**
 * @description
 * The MotionContainer component is a powerful wrapper that
 * provides out-of-the-box animation support for any element
 * you picked.
 *
 * @example
 *
 *  <MotionContainer
 *    elementType="div"
 *    animation={{
 *      mode: ["fadeIn", "filterBlurIn"],
 *      transition: "smooth",
 *      duration: 1,
 *    }}
 *    className="your-css-goes-here"
 *  >
 *    <MyChildComponent />
 *  </MotionContainer>
 *
 * @param {MotionContainerProps} props The component props.
 * @typedef {Object} MotionContainerProps
 * @param {AnimationKeys | AnimationKeys[]} animation.mode - animation mode(s)
 * @param {TransitionKeys} animation.transition - animation transition type
 * @param {number | undefined} [animation.delay] - animation delay
 * @param {number} [animation.duration] - animation duration
 * @param {Partial<ControllerProps>} [controller] - animation controller
 * @param {React.ReactNode} children - children node
 * @param {React.ElementType} [elementType] - element type
 * @param {string} [className] - className
 * @param {React.HTMLAttributes<HTMLElement>} [props] - additional props
 *
 * @returns {React.ReactElement} The rendered component.
 */
export interface MotionContainerProps extends GeneralHTMLAttributes {
  animation: MotionAnimationProps;
  elementType: React.ElementType;
  children?: React.ReactNode;
  controller?: MotionControllerProps;
}

export interface MotionChainProps extends GeneralHTMLAttributes {
  animations: MotionAnimationProps[];
  elementType: React.ElementType;
  children: React.ReactNode[];
  config: MotionChainConfigProps;
  controller?: MotionControllerProps;
}

export interface MotionTextProps extends GeneralHTMLAttributes {
  animation: MotionAnimationProps;
  elementType: React.ElementType;
  config: MotionTextConfigProps;
  children: React.ReactNode;
  controller?: MotionControllerProps;
  wrapperClassName?: string;
}

export interface MotionImageProps extends GeneralHTMLAttributes {
  animation: MotionAnimationProps;
  fallback?: React.ReactNode;
  wrapperClassName?: string;
  config: MotionImageConfigProps;
  controller?: MotionControllerProps;
}

export interface MotionMovieProps extends GeneralHTMLAttributes {
  animations: MotionMovieAnimationsProps;
  controller?: MotionControllerProps;
  config: MotionMovieConfigProps;
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
  delayLogic: DelayLogic | undefined;
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

// Constants

export interface AnimationLibraryProps {
  [key: string | AnimationKeys]: {
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
export interface Transitions {
  [key: string | TransitionKeys]: TransitionConfig;
}
/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

// Defaults

type ComponentPropsMap = {
  MotionContainer: MotionContainerProps;
  MotionChain: MotionChainProps;
  MotionImage: MotionImageProps;
  MotionText: MotionTextProps;
  MotionLink: MotionLinkProps;
  MotionMovie: MotionMovieProps;
  CoreMotion: Record<string, unknown>;
};

export type MotionDefaultsProps = {
  [K in keyof ComponentPropsMap]?: Partial<ComponentPropsMap[K]>;
};

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
  | "heartbeat"
  | "heartbeatRubber"
  | "wobble"
  | "pulse"
  | "skewX45"
  | "skewX90"
  | "skewX180"
  | "skewY45"
  | "skewY90"
  | "skewY180"
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
  | "orbitRotation";

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
