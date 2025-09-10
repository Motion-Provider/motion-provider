import defaults from "./constants/defaults";
import logError from "./utils/getErrorLogs";
import { AnimationModule, MotionContainerProps } from "./types";
import { motion, useInView } from "motion/react";
import React, { FC, useMemo, useRef } from "react";
import { TransitionConfig } from "./types";
import { useAnimationMixer } from "./hooks/use-animation-mixer";
import transitions from "./constants/transitions";
import animations from "./constants/animations";
import { AnimationKeys } from "./constants/animations";

/**
 * @description
 * The MotionContainer component is a powerful MP wrapper that
 * provides out-of-the-box animation support for any element
 * you picked and mandatoryly used across MP components. Basically
 * everything you need to make the web better :) And quick reminder,
 * the other MP components are built on top of MotionContainer.
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
const MotionContainer: FC<MotionContainerProps> = ({
  animation = defaults.MotionContainer.animation,
  controller = { ...defaults.MotionContainer.controller },
  children,
  elementType = defaults.MotionContainer.elementType,
  className,
  ...props
}) => {
  const { mode, transition, delay, duration } = animation;

  const {
    configView = { once: true, amount: 0.5 },
    isAnimationStopped,
    trigger,
    reverse,
  } = controller;

  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, configView);

  const mix = useMemo(() => getAnimationsToMix(mode), [mode]);
  const { initial, animate } = useAnimationMixer({
    animations: mix,
    reverse,
  });

  const transitionConfig: TransitionConfig = useMemo(() => {
    const selectedTransition = transitions[transition || "default"];

    if (isAnimationStopped) {
      return {
        ...selectedTransition,
        duration: duration || selectedTransition.duration,
        delay: 0,
      };
    }

    return {
      ...selectedTransition,
      duration: duration || selectedTransition.duration,
      delay: delay || 0,
    };
  }, [delay, duration, isAnimationStopped, transition]);

  const animationState = useMemo(() => {
    if (isAnimationStopped) return animate;

    if (typeof trigger !== "undefined") return trigger ? animate : initial;

    return isInView ? animate : initial;
  }, [isAnimationStopped, isInView, initial, animate, trigger]);

  const initialState = useMemo(() => {
    if (isAnimationStopped) return initial;

    return initial;
  }, [isAnimationStopped, initial]);

  if (!animation || typeof animation === "undefined") {
    logError({
      msg: "Animation cannot be undefined or null, returning null.",
      mod: "error",
      src: "MotionContainer",
    });
    return null;
  }

  const MotionElement = motion[
    elementType as keyof typeof motion
  ] as React.ElementType;

  if (!MotionElement) {
    logError({
      msg: `Invalid motion elementType: '${elementType}'`,
      mod: "error",
      src: "MotionContainer",
    });
    return null;
  }

  return React.createElement(
    MotionElement,
    {
      className,
      ref,
      initial: initialState,
      animate: animationState,
      transition: transitionConfig,
      ...props,
    },
    children
  );
};

function getAnimationsToMix(
  mode: AnimationKeys[] | AnimationKeys
): AnimationModule[] | AnimationModule {
  if (
    !mode ||
    typeof mode === "undefined" ||
    (Array.isArray(mode) && mode.length <= 0)
  ) {
    logError({
      mod: "error",
      msg: "Mode prop cannot be either 'null', 'undefined' or an empty array!",
      src: "CoreMotion",
    });
    return animations["default"];
  }

  const allModes = Object.keys(animations);

  if (Array.isArray(mode)) {
    const checkModeIsValid = mode.every((key) => allModes.includes(key));

    if (!checkModeIsValid) {
      logError({
        mod: "error",
        msg: `One or more of 'mode' member(s) are not matching with the pre-defined animation list. Check the list:
${allModes.map((k) => `${k}\n`).join("- ")}
`,
        src: "CoreMotion",
      });

      return animations["default"];
    }

    const extractedModes = mode.map((key) => animations[key]);
    return extractedModes;
  } else {
    if (typeof mode === "string") {
      const checkModeIsValid = allModes.includes(mode);

      if (!checkModeIsValid) {
        logError({
          mod: "error",
          msg: `The 'mode' you select is not matching with the pre-defined animation list.  
Check the list:
${allModes.map((k) => `${k}\n`).join("- ")}
`,
          src: "CoreMotion",
        });
        return {
          initial: {},
          animate: {},
        };
      }

      return animations[mode];
    }

    logError({
      mod: "error",
      msg: `Mode prop must be either 'string' or 'string[]'!`,
      src: "CoreMotion",
    });

    return animations["default"];
  }
}

export default MotionContainer;
