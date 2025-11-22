"use client";

import { motion, useInView } from "motion/react";
import React, { type FC, useMemo, useRef } from "react";
import animations, { type AnimationKeys } from "../constants/animations";
import defaults from "../constants/defaults";
import transitions from "../constants/transitions";
import { useAnimationMixer } from "../hooks";
import type {
  AnimationModule,
  MotionContainerProps,
  TransitionConfig,
} from "../types";

import { cn } from "../utils";

/**
 * @description
 * Powerful motion wrapper provides out-of-the-box animation support
 * for any element and is used across all MP components. The other
 * MP components are built at the top of the MotionContainer.
 *
 * @example
 *
 *  <MotionContainer
 *    elementType="div" <-- define the element type (eg. "div", "p", "h1")
 *    animation={{
 *      mode: ["fadeIn", "filterBlurIn"], <-- animation mode
 *      transition: "smooth",
 *      delay: 0,
 *      duration: 1,
 *    }}
 *    className="your-css-goes-here"
 *  >
 *    <YourChildNodeToAnimate />
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
export const MotionContainer: FC<MotionContainerProps> = ({
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
    throw new Error(
      "Oops, 'animation' prop cannot be undefined or null, check your motion providers."
    );
  }

  const MotionElement = motion[
    elementType as keyof typeof motion
  ] as React.ElementType;

  if (!MotionElement)
    throw new Error(
      `Oops, '${elementType}' is not a valid motion element, check your motion providers.`
    );

  return React.createElement(
    MotionElement,
    {
      className: cn(className, "will-change-auto"),
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
  if (!mode) {
    console.error(
      "'mode' prop cannot be undefined or null, fallback returning to 'default' animation."
    );
    return animations.default;
  }

  if (Array.isArray(mode) && mode.length <= 0) {
    console.error(
      "Oops, 'mode' prop cannot be an empty array, fallback returning to 'default' animation."
    );
    return animations.default;
  }

  const allModes = Object.keys(animations);

  if (Array.isArray(mode)) {
    const checkModeIsValid = mode.every((key) => allModes.includes(key));

    if (!checkModeIsValid) {
      console.error(
        "One or more of 'mode' member(s) are not matching with the pre-defined animation list. Check the type error, fallback returning to 'default' animation."
      );
      return animations.default;
    }

    const extractedModes = mode.map((key) => animations[key]);
    return extractedModes;
  } else {
    if (typeof mode === "string") {
      const checkModeIsValid = allModes.includes(mode);
      if (!checkModeIsValid) {
        console.error(
          "The 'mode' you select is not matching with the pre-defined animation list. Check the type error, fallback returning to 'default' animation."
        );
        return animations.default;
      }

      return animations[mode];
    }

    console.error(
      "Mode prop must be either 'AnimationKeys' or 'AnimationKeys[]'. Check the type error, fallback returning to 'default' animation."
    );
    return animations.default;
  }
}
