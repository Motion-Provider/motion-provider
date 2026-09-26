import type {
  AnchorHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  ImgHTMLAttributes,
  JSX,
  ReactNode,
  Ref,
  SVGAttributes,
} from "react";
import type animations from "./constants/animations.js";
import type delays from "./constants/delays.js";
import type transitions from "./constants/transitions.js";
import type {
  AnimateOptions,
  AnimationController,
  AnimationModule,
  AnimationResult,
  ScrollOptions,
  Timing,
  ViewOptions,
} from "./engine/types.js";

export type * from "./engine/types.js";
export type AnimationKeys = keyof typeof animations;
export type TransitionKeys = keyof typeof transitions;
export type DelayLogic = (typeof delays)[number];
export type MotionElementType = keyof JSX.IntrinsicElements;
export type SplittedTextModes = "words" | "chars";
export type ImageMotionPieces = number;
export type AnimationObjProps = AnimationModule["initial"];
export type TransitionConfig = Timing;
export type Animations = Record<string, AnimationModule>;
export type Transitions = Record<string, Timing>;
/** Declarative control retained for compatibility. Commands can be supplied through controls. */
export interface MotionControllerProps {
  configView?: ViewOptions;
  trigger?: boolean;
  isAnimationStopped?: boolean;
  reverse?: boolean;
  controls?: AnimationController;
  scroll?: ScrollOptions;
}
export type ControllerInput = AnimationController | MotionControllerProps;
/** Mix string presets or supply a self-contained definition. All timing values are seconds. */
export interface MotionAnimationProps extends Omit<Timing, "ease"> {
  mode:
    | AnimationKeys
    | AnimationModule
    | readonly (AnimationKeys | AnimationModule)[];
  transition?: TransitionKeys | Timing;
  ease?: Timing["ease"];
}
export interface MotionChainConfigProps {
  delayLogic?: DelayLogic;
  /** Seconds between items, independent of animation.duration. */
  duration?: number;
  customLogic?: (index: number) => number;
  /** Seed used by deterministic delay algorithms. */
  seed?: number;
  /** Bound generated delays to avoid extreme exponential/Fibonacci waits (default 60s). */
  maxDelay?: number;
}
export interface MotionTextConfigProps extends MotionChainConfigProps {
  mode?: SplittedTextModes;
  space?: number | string;
}
export interface MotionImageConfigProps extends MotionChainConfigProps {
  img: string;
  /** Positive perfect square; capped at 1600 DOM tiles. */
  pieces: ImageMotionPieces;
  fn?: "hover" | "click";
}
type DomProps = Omit<
  HTMLAttributes<HTMLElement>,
  "onAnimationStart" | "onAnimationEnd"
> &
  Pick<
    SVGAttributes<SVGElement>,
    | "viewBox"
    | "d"
    | "fill"
    | "stroke"
    | "strokeWidth"
    | "cx"
    | "cy"
    | "r"
    | "x"
    | "y"
    | "width"
    | "height"
  >;
export interface MotionBaseProps extends DomProps {
  elementType?: MotionElementType;
  controller?: ControllerInput;
  /** User preference is respected by default. */
  reducedMotion?: AnimateOptions["reducedMotion"];
  onMotionError?: (error: Error) => void;
  onMotionComplete?: (result: AnimationResult) => void;
  /** Base static style. Animation-owned CSS properties override it only while mounted. */
  style?: CSSProperties;
}
export interface MotionContainerProps extends MotionBaseProps {
  animation: MotionAnimationProps;
}
export interface MotionProps extends MotionBaseProps {
  /** Direct definitions allow per-preset tree shaking without a string registry. */
  definition: AnimationModule;
  timing?: Timing;
}
export interface MotionChainProps extends MotionBaseProps {
  animations?: readonly MotionAnimationProps[];
  /** Shared animation is an alternative to one animation per child. */
  animation?: MotionAnimationProps;
  config?: MotionChainConfigProps;
  children?: ReactNode;
}
export interface MotionTextProps
  extends Omit<MotionContainerProps, "children"> {
  children: string;
  config?: MotionTextConfigProps;
  wrapperClassName?: string;
}
export type ImageHTMLProps = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  | "alt"
  | "loading"
  | "decoding"
  | "fetchPriority"
  | "crossOrigin"
  | "referrerPolicy"
  | "sizes"
  | "srcSet"
  | "draggable"
  | "onLoad"
  | "onError"
>;
export interface MotionImageProps
  extends Omit<
      HTMLAttributes<HTMLDivElement>,
      "onLoad" | "onError" | "children"
    >,
    ImageHTMLProps {
  animation: MotionAnimationProps;
  config: MotionImageConfigProps;
  controller?: ControllerInput;
  reducedMotion?: AnimateOptions["reducedMotion"];
  wrapperClassName?: string;
  fallback?: ReactNode;
  onMotionError?: (error: Error) => void;
  onMotionComplete?: (result: AnimationResult) => void;
  ref?: Ref<HTMLDivElement>;
}
export interface MotionMovieAnimationsProps
  extends Omit<MotionAnimationProps, "mode"> {
  enter: MotionAnimationProps["mode"];
  exit: MotionAnimationProps["mode"];
}
export interface MotionMovieConfigProps
  extends Omit<MotionImageConfigProps, "img" | "fn"> {
  images: readonly string[];
  /** Hold time in seconds after entry completes and before exit begins. */
  animationDuration: number;
}
export interface MotionMovieProps
  extends Omit<MotionImageProps, "animation" | "config" | "onMotionComplete"> {
  animations: MotionMovieAnimationsProps;
  config: MotionMovieConfigProps;
  prefetch?: boolean;
  onIndexChange?: (index: number) => void;
}
export interface MotionLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  controller?: AnimationController;
  onReverse?: () => void | Promise<unknown>;
  /** Legacy minimum wait in milliseconds for synchronous onReverse callbacks. */
  timer?: number;
  /** Maximum exit wait in milliseconds; defaults to 10000. */
  timeout?: number;
  /** Router adapter: e.g. href => router.push(href). Default uses location.assign. */
  navigate?: (href: string) => void | Promise<void>;
  onMotionError?: (error: Error) => void;
}
