import { EasingDefinition, UseInViewOptions } from "motion/react";
import { HTMLAttributes } from "react";
import { AnimationKeys } from "../constants/animations";
import { TransitionKeys } from "../constants/transitions";
import { DelayLogic } from "../constants/delays";

export interface MotionControllerProps {
  /**
   * @description
   * Allows you to pass options to the useInView hook,
   * which is used to control the animation with it's
   * viewport visibility.
   *
   * @see https://motion.dev/docs/react-use-in-view
   */
  configView?: Omit<UseInViewOptions, "root">;
  /**
   * @description
   * A controllered prop to trigger the animation state in 2 ways:
   * - Start animate
   * - Reverse animate
   *
   * Behaves like a mini version of @param [MotionControllerProps]
   * because it works with only 2 way in one flow:
   *
   * Start —> animateBegin & Reverse —> animateRollback
   *
   * @default undefined
   * @type boolean
   * @example
   *
   * const [trigger, setTrigger] = useState(false);
   *
   * <MotionContainer
   *   onClick={() => setTrigger(prev => !prev)}
   *   elementType="div"
   *   animation={{
   *     mode: ["filterBrightnessFade"],
   *     transition: "springy",
   *     duration: 1,
   *   }}
   *   controller={{
   *     trigger,
   *   }}
   *   className="your-css-goes-here"
   * />
   *   <IfThereIsChildComponent />
   * </MotionContainer>
   *
   */
  trigger?: boolean;
  /**
   * @description
   * Indicates whether the animation should be stopped completely.
   * Not recommended for stand-alone use. Powerful with useAnimation
   * hook when passed as a prop to control the animation flow.
   *
   * @default undefined
   * @type {boolean}
   * @example
   * const { onReverse, control } = useAnimationControl();
   * const { isAnimationStopped, reverse } = useAnimation(control);
   *
   * // might be used in any MP component
   * <MotionContainer
   *   elementType="div"
   *   animation={{
   *     mode: ["fadeIn", "filterBlurIn"],
   *     transition: "smooth",
   *   }}
   *   controller={{
   *     isAnimationStopped,
   *     reverse
   *   }}
   *   className="your-css-goes-here"
   * />
   */
  isAnimationStopped?: boolean;
  /**
   * @description
   * Indicates whether the animation should be reversed.
   * Not recommended for stand-alone use. Powerful with useAnimation
   * hook when passed as a prop to control the animation flow.
   *
   * @default undefined
   * @type {boolean}
   * @example
   * const { onReverse, control } = useAnimationControl();
   * const { isAnimationStopped, reverse } = useAnimation(control);
   *
   * // might be used in any MP component
   * <MotionContainer
   *   elementType="div"
   *   animation={{
   *     mode: ["fadeIn", "filterBlurIn"],
   *     transition: "smooth",
   *   }}
   *   controller={{
   *     isAnimationStopped,
   *     reverse
   *   }}
   *   className="your-css-goes-here"
   * />
   */
  reverse?: boolean;
}

export interface MotionAnimationProps {
  /**
   * @description
   * Predefined animation mode(s) to be applied. MP provides
   * outrageous numbers(75+) of predefined animation modes for
   * you to choose from without worrying about the compexity which
   * is fixed and always hovering around O(n).
   *
   * @default "opacity"
   * @type {AnimationKeys | AnimationKeys[]}
   * @example
   *
   * <MotionContainer
   *   elementType="div"
   *   animation={{
   *     // yes, that's actually quite all the thing
   *     // to animate without hesitation :)
   *     mode: "fadeIn",
   *     transition: "smooth",
   *   }}
   *   className="your-css-goes-here"
   * />
   */
  mode: AnimationKeys | AnimationKeys[];
  /**
   * @description
   * Predefined animation transition type to be applied.
   * Find the best transition based on your animation needing.
   *
   * @default "default"
   * @type {TransitionKeys}
   * @example
   *
   * <MotionContainer
   *   elementType="div"
   *   animation={{
   *     mode: "fadeIn",
   *     // powerful typesafe API's enables developer
   *     // to struggle less to choose the right transition
   *     transition: "smooth",
   *   }}
   *   className="your-css-goes-here"
   * />
   */
  transition: TransitionKeys;
  /**
   * @description
   * Delay of the animation applies right before the animation starts.
   * Creates a standby time and you can think of it as a pause before
   * the animation starts.
   *
   * @type {number} delay of the animation in seconds(s).
   * @default 0
   */
  delay?: number;
  /**
   * @description
   * Duration of the animation in seconds(s).
   * It's recommended to keep it between 0.3-1.5
   * seconds.
   *
   * @type {number} duration of the animation in seconds(s).
   * @default 0.5
   * @minimum 0
   *
   */
  duration?: number;
}

// Configs

export interface MotionChainConfigProps {
  /**
   * @description
   * Indicates the animation's sequence and
   * also comes with powerful pre-defined APIs.
   *
   * @default "linear"
   * @type {DelayLogic}
   *
   */
  delayLogic?: DelayLogic;
  /**
   * @description
   * Custom delay logic for each animation.
   * You can create custom sequence effect
   * depending on the index of the animation
   * with this prop.
   *
   * @default undefined
   * @type {(index: number) => number}
   *
   */
  customLogic?: (index: number) => number;
  /**
   * @description
   * Total duration of the animation process in seconds(s).
   * duration represents the base of the
   * animation that is being used inside the
   * 'calculateDelay' utility fn to make sure
   * each animation is passing in sequence.
   *
   * @default 0.5
   * @type {number}
   * @minimum 0
   *
   */
  duration: number;
}

export interface MotionTextConfigProps extends MotionChainConfigProps {
  /**
   * @description
   * Text modes are used to split the text into words
   * or characters and animate them individually.
   *
   * @default "chars"
   * @type {SplittedTextModes}
   *
   */
  mode: SplittedTextModes;
  /**
   * @description
   * Indicates the space between each word or character.
   *
   * @default 0
   * @type {MotionTextConfigSpaceProps}
   *
   */
  space?: MotionTextConfigSpaceProps;
}

export interface MotionImageConfigProps extends MotionChainConfigProps {
  /**
   * @description
   * The amount of pieces that is going to
   * be splitted for the calculation of
   * per-piece delay throughout the image.
   *
   * IMPORTANT NOTE:
   * Keeping the amount of pieces higher than 200
   * might cause performance issues particularly
   * CLS metrics. So keep in mind that this prop
   * has to be used with caution.
   *
   * @default 64
   * @type {ImageMotionPieces}
   *
   */
  pieces: ImageMotionPieces;
  /**
   * @description
   * Some magic prop to add event handlers and
   * trigger per-piece animations. It can be
   * used to create interactive motion. There are
   * 2 modes available:
   * - `"hover"`: mouse movement triggers a 3x3 neighborhood around the pointer.
   * - `"click"`: clicking triggers the neighborhood for the clicked cell.
   *
   * @default undefined
   * @type {ImageMotionFnTypes}
   *
   */
  fn?: ImageMotionFnTypes;
  /**
   * @description
   * The path to the image that is going to be
   * used through MotionImage components
   * in order to fill the grid.
   *
   * @default undefined
   * @type {string}
   */
  img?: string;
}

type MotionMovieConfigProps = Omit<
  MotionImageConfigProps,
  "duration" | "img"
> & {
  /**
   * @description
   * A list of path that is going to be
   * used through MotionMovie components
   * in order to fill the grid and make the
   * transition between the provided slides.
   *
   * @default undefined
   * @type {string}
   */
  images: string[];
  /**
   *
   * @description
   * Total animation duration of the slide
   * transition process in seconds(s). It has
   * to be bigger than the base duration in order
   * to create a smooth transition otherwise the MotionMovie
   * error logger will be triggered with a warn in your console.
   *
   * @default 2
   * @type {number}
   */
  animationDuration: number;
};

export interface MotionMovieAnimationsProps
  extends Omit<MotionAnimationProps, "mode"> {
  /**
   * @description
   * Enter animations are covering the start point
   * of the animation process per slide which
   * means the user will see each slide within
   * the enter animations.
   *
   * @default undefined
   * @type {AnimationKeys[] | AnimationKeys}
   */
  enter: AnimationKeys[] | AnimationKeys;
  /**
   * @description
   * Exit animations are covering the end point
   * of the animation process per slide which
   * means the user will end seeing the slide with
   * the exit prop's animations.
   *
   * @default undefined
   * @type {AnimationKeys[] | AnimationKeys}
   */
  exit: AnimationKeys[] | AnimationKeys;
}

// Core

type GeneralHTMLAttributes = Omit<HTMLAttributes<HTMLElement>, "children">;

export interface MotionContainerProps extends GeneralHTMLAttributes {
  /**
   * @description
   * Defines properties that can be
   * mandatoryly used across MP components. It includes animation modes,
   * transitions, delays, and durations. Basically everything you need to
   * make the web better :)
   *
   * @property {AnimationKeys | AnimationKeys[]} mode - animation mode(s)
   * @property {TransitionKeys} transition - animation transition type
   * @property {number | undefined} [delay] - animation delay
   * @property {number} [duration] - animation duration
   *
   * @example
   *
   * <MotionContainer
   *   elementType="div"
   *   animation={{
   *     mode: ["fadeIn", "filterBlurIn"],
   *     transition: "smooth",
   *   }}
   *   className="your-css-goes-here"
   * />
   *
   */
  animation: MotionAnimationProps;
  /**
   * @description
   * The elementType prop allows you to specify the HTML element type
   * that will be used as the root element for the MotionContainer.
   *
   * @default "div"
   * @type {React.ElementType}
   */
  elementType: React.ElementType;
  /**
   * @description
   * The children prop is a React node that will be rendered inside
   * the MotionContainer component. It is optional and can be used to
   * add content to the component.
   *
   * @default undefined
   * @type {React.ReactNode}
   */
  children?: React.ReactNode;
  /**
   * @description
   * This is the central scaffold part that you might see as
   * a god of CAS(Centralized Animation System). It's actually
   * standing on the top of each MP components to control
   * and manage the animation process by managing the flow.
   *
   * Highly recommended to use with both
   * @type {UseAnimationControlProps}
   * and @type {UseAnimationProps}
   *
   * @default undefined
   * @typedef {Object} MotionControllerProps
   * @param {boolean} isAnimationStopped
   * @param {boolean} reverseAnimation
   * @param {Partial<UseInViewOptions>} [configView]
   * @param {boolean} [trigger]
   *
   * @example
   *
   * //full example
   *
   * const { onReverse, control } = useAnimationControl();
   * const { isAnimationStopped, reverse } = useAnimation(control);
   *
   * // trigger the animation freely
   * <button onClick={onReverse}>Reverse</button>
   * <MotionContainer
   *   elementType="div"
   *   animation={{
   *     mode: ["fadeUp", "translate3dIn"],
   *     transition: "cubicBounce",
   *     duration: 1,
   *   }}
   *   controller={{
   *     trigger: true, // immediately start animation bypassing configView
   *     configView: { once: true, amount: 0.5 } // determine whether to start animation when it's in viewport
   *     isAnimationStopped, // pass the CAS props
   *     reverse // pass the CAS props
   *   }}
   *   className="your-css-goes-here"
   * />
   *   <IfThereIsChildComponent />
   * </MotionContainer>
   *
   */
  controller?: MotionControllerProps;
}

export interface MotionChainProps extends GeneralHTMLAttributes {
  /**
   * @description
   * Defines properties that can be mandatoryly used across MP components.
   * It includes animation modes, transitions, delays, and durations. Basically
   * everything you need to make the web better :)
   *
   * @type {MotionAnimationProps[]} animations
   * @example
   *
   * const animations = Array.from({ length: 5 }, () => ({
   *    mode: ["scaleZoomIn","fadeIn"],
   *    transition: "slowSmooth",
   * }))
   * <MotionChain
   *   elementType="div"
   *   animations={animations}
   *   className="your-css-goes-here"
   * />
   *
   */
  animations: MotionAnimationProps[];
  /**
   * @description
   * The elementType prop allows you to specify the HTML element type
   * that will be used as the root element for the MotionContainer where
   * MotionChain encapsulates as its children.
   *
   * @default "div"
   * @type {React.ElementType}
   */
  elementType: React.ElementType;
  /**
   * @description
   * The children prop is a React nodes that will be rendered inside
   * the MotionChain component.
   *
   * @default undefined
   * @type {React.ReactNode[]}
   */
  children: React.ReactNode[];
  config: MotionChainConfigProps;
  /**
   * @description
   * This is the central scaffold part that you might see as
   * a god of CAS(Centralized Animation System). It's actually
   * standing on the top of each MP components to control
   * and manage the animation process by managing the flow.
   *
   * Highly recommended to use with both:
   * @type {UseAnimationControlProps}
   * @type {UseAnimationProps}
   *
   * @default undefined
   * @typedef {Object} MotionControllerProps
   * @param {boolean} isAnimationStopped
   * @param {boolean} reverseAnimation
   * @param {Partial<UseInViewOptions>} [configView]
   * @param {boolean} [trigger]
   *
   * @example
   *
   * //full example
   *
   * const { onReverse, control } = useAnimationControl();
   * const { isAnimationStopped, reverse } = useAnimation(control);
   *
   * // trigger the animation freely
   * <button onClick={onReverse}>Reverse</button>
   * <MotionContainer
   *   elementType="div"
   *   animation={{
   *     mode: ["fadeUp", "translate3dIn"],
   *     transition: "cubicBounce",
   *     duration: 1,
   *   }}
   *   controller={{
   *     trigger: true, // immediately start animation bypassing configView
   *     configView: { once: true, amount: 0.5 } // determine whether to start animation when it's in viewport
   *     isAnimationStopped, // pass the CAS props
   *     reverse // pass the CAS props
   *   }}
   *   className="your-css-goes-here"
   * />
   *   <IfThereIsChildComponent />
   * </MotionContainer>
   *
   */
  controller?: MotionControllerProps;
}

export interface MotionTextProps extends GeneralHTMLAttributes {
  /**
   * @description
   * Defines properties that can be
   * mandatoryly used across MP components. It includes animation modes,
   * transitions, delays, and durations. Basically everything you need to
   * make the web better :)
   *
   * @property {AnimationKeys | AnimationKeys[]} mode - animation mode(s)
   * @property {TransitionKeys} transition - animation transition type
   * @property {number | undefined} [delay] - animation delay
   * @property {number} [duration] - animation duration
   *
   * @example
   *
   * <MotionContainer
   *   elementType="div"
   *   animation={{
   *     mode: ["fadeIn", "filterBlurIn"],
   *     transition: "smooth",
   *   }}
   *   className="your-css-goes-here"
   * />
   *
   */
  animation: MotionAnimationProps;
  /**
   * @description
   * The elementType prop allows you to specify the HTML element type
   * that will be used as the root element for the MotionContainer.
   *
   * @default "div"
   * @type {React.ElementType}
   */
  elementType: React.ElementType;
  config: MotionTextConfigProps;
  /**
   * @description
   * The children prop is a React node that will be rendered inside
   * the MotionContainer component. It is optional and can be used to
   * add content to the component.
   *
   * @default undefined
   * @type {React.ReactNode}
   */
  children: React.ReactNode;
  /**
   * @description
   * This is the central scaffold part that you might see as
   * a god of CAS(Centralized Animation System). It's actually
   * standing on the top of each MP components to control
   * and manage the animation process by managing the flow.
   *
   * Highly recommended to use with both
   * @type {UseAnimationControlProps}
   * and @type {UseAnimationProps}
   *
   * @default undefined
   * @typedef {Object} MotionControllerProps
   * @param {boolean} isAnimationStopped
   * @param {boolean} reverseAnimation
   * @param {Partial<UseInViewOptions>} [configView]
   * @param {boolean} [trigger]
   *
   * @example
   *
   * //full example
   *
   * const { onReverse, control } = useAnimationControl();
   * const { isAnimationStopped, reverse } = useAnimation(control);
   *
   * // trigger the animation freely
   * <button onClick={onReverse}>Reverse</button>
   * <MotionContainer
   *   elementType="div"
   *   animation={{
   *     mode: ["fadeUp", "translate3dIn"],
   *     transition: "cubicBounce",
   *     duration: 1,
   *   }}
   *   controller={{
   *     trigger: true, // immediately start animation bypassing configView
   *     configView: { once: true, amount: 0.5 } // determine whether to start animation when it's in viewport
   *     isAnimationStopped, // pass the CAS props
   *     reverse // pass the CAS props
   *   }}
   *   className="your-css-goes-here"
   * />
   *   <IfThereIsChildComponent />
   * </MotionContainer>
   *
   */
  controller?: MotionControllerProps;
  /**
   * @description
   * The wrapperClassName prop is a string that
   * specifies the class name(s) to be applied to the
   * wrapper element that wraps the child text elements
   *
   * @default undefined
   * @type {string}
   */
  wrapperClassName?: string;
}

export interface MotionImageProps extends GeneralHTMLAttributes {
  /**
   * Defines properties that can be
   * mandatoryly used across MP components. It includes animation modes,
   * transitions, delays, and durations. Basically everything you need to
   * make the web better :)
   *
   * @typedef {Object} MotionAnimationProps
   * @property {AnimationKeys | AnimationKeys[]} mode - animation mode(s)
   * @property {TransitionKeys} transition - animation transition type
   * @property {number | undefined} [delay] - animation delay
   * @property {number} [duration] - animation duration
   *
   * @example
   *
   * <MotionContainer
   *   elementType="div"
   *   animation={{
   *     mode: ["fadeIn", "filterBlurIn"],
   *     transition: "smooth",
   *   }}
   *   className="your-css-goes-here"
   * />
   *
   */
  animation: MotionAnimationProps;
  /**
   * @description
   * A fallback component to be rendered when the image
   * is being loaded.
   *
   * @default undefined
   * @type {React.ReactNode}
   */
  fallback?: React.ReactNode;
  /**
   * @description
   * The wrapperClassName prop is a string that
   * specifies the class name(s) to be applied to the
   * wrapper element that wraps the child text elements
   *
   * @default undefined
   * @type {string}
   */
  wrapperClassName?: string;
  config: MotionImageConfigProps;
  /**
   * @description
   * This is the central scaffold part that you might see as
   * a god of CAS(Centralized Animation System). It's actually
   * standing on the top of each MP components to control
   * and manage the animation process by managing the flow.
   *
   * Highly recommended to use with both
   * @type {UseAnimationControlProps}
   * and @type {UseAnimationProps}
   *
   * @default undefined
   * @typedef {Object} MotionControllerProps
   * @param {boolean} isAnimationStopped
   * @param {boolean} reverseAnimation
   * @param {Partial<UseInViewOptions>} [configView]
   * @param {boolean} [trigger]
   *
   * @example
   *
   * //full example
   *
   * const { onReverse, control } = useAnimationControl();
   * const { isAnimationStopped, reverse } = useAnimation(control);
   *
   * // trigger the animation freely
   * <button onClick={onReverse}>Reverse</button>
   * <MotionContainer
   *   elementType="div"
   *   animation={{
   *     mode: ["fadeUp", "translate3dIn"],
   *     transition: "cubicBounce",
   *     duration: 1,
   *   }}
   *   controller={{
   *     trigger: true, // immediately start animation bypassing configView
   *     configView: { once: true, amount: 0.5 } // determine whether to start animation when it's in viewport
   *     isAnimationStopped, // pass the CAS props
   *     reverse // pass the CAS props
   *   }}
   *   className="your-css-goes-here"
   * />
   *   <IfThereIsChildComponent />
   * </MotionContainer>
   *
   */
  controller?: MotionControllerProps;
}

export interface MotionMovieProps extends GeneralHTMLAttributes {
  /**
   * @description
   * A superset of @type {MotionImageProps} that enables you
   * to create a visual slider conventionally using almost the
   * same syntax similar to @type {MotionImageProps}.
   *
   *
   * @default undefined
   * @type {MotionMovieAnimationsProps}
   */
  animations: MotionMovieAnimationsProps;
  /**
   * @description
   * This is the central scaffold part that you might see as
   * a god of CAS(Centralized Animation System). It's actually
   * standing on the top of each MP components to control
   * and manage the animation process by managing the flow.
   *
   * Highly recommended to use with both
   * @type {UseAnimationControlProps}
   * and @type {UseAnimationProps}
   *
   * @default undefined
   * @typedef {Object} MotionControllerProps
   * @param {boolean} isAnimationStopped
   * @param {boolean} reverseAnimation
   * @param {Partial<UseInViewOptions>} [configView]
   * @param {boolean} [trigger]
   *
   * @example
   *
   * //full example
   *
   * const { onReverse, control } = useAnimationControl();
   * const { isAnimationStopped, reverse } = useAnimation(control);
   *
   * // trigger the animation freely
   * <button onClick={onReverse}>Reverse</button>
   * <MotionContainer
   *   elementType="div"
   *   animation={{
   *     mode: ["fadeUp", "translate3dIn"],
   *     transition: "cubicBounce",
   *     duration: 1,
   *   }}
   *   controller={{
   *     trigger: true, // immediately start animation bypassing configView
   *     configView: { once: true, amount: 0.5 } // determine whether to start animation when it's in viewport
   *     isAnimationStopped, // pass the CAS props
   *     reverse // pass the CAS props
   *   }}
   *   className="your-css-goes-here"
   * />
   *   <IfThereIsChildComponent />
   * </MotionContainer>
   *
   */
  controller?: MotionControllerProps;
  config: MotionMovieConfigProps;
  /**
   * @description
   * A fallback component to be rendered when the image
   * is being loaded.
   *
   * @default undefined
   * @type {React.ReactNode}
   */
  fallback?: React.ReactNode;
  /**
   * @description
   * The wrapperClassName prop is a string that
   * specifies the class name(s) to be applied to the
   * wrapper element that wraps the child text elements
   *
   * @default undefined
   * @type {string}
   */
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
export interface TransitionsLib {
  [key: string]: TransitionConfig;
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
