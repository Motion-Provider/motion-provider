import {
  MOTION_PROVIDER_DEFAULTS as defaults,
  MOTION_CONTAINER_ANIMATION_DEFAULT,
  MOTION_CONTAINER_CONTROLLER_DEFAULT,
} from "./lib/defaults.lib";
import logError from "./utils/getErrorLogs";
import { AnimationKeys, AnimationModule, MotionContainerProps } from "./types";
import { motion, useInView } from "motion/react";
import React, { FC, useMemo, useRef } from "react";
import { TransitionConfig } from "./types";
import { useAnimationMixer } from "./hooks/use-animation-mixer";
import transitions from "./constants/transitions";
import animations from "./constants/animations";

const MotionContainer: FC<MotionContainerProps> = ({
  animation = { ...MOTION_CONTAINER_ANIMATION_DEFAULT },
  controller = { ...MOTION_CONTAINER_CONTROLLER_DEFAULT },
  children,
  elementType = defaults.MOTION_CONTAINER_ELEMENT_TYPE_DEFAULT,
  className,
}) => {
  const {
    mode,
    transition,
    delay,
    duration = defaults.MOTION_CONTAINER_DURATION_DEFAULT,
  } = animation;

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
    if (isAnimationStopped)
      return { ...animations["opacity"].animate, ...animate };

    if (typeof trigger !== "undefined") return trigger ? animate : initial;

    return isInView ? animate : initial;
  }, [isAnimationStopped, isInView, initial, animate, trigger]);

  const initialState = useMemo(() => {
    if (isAnimationStopped)
      return { ...animations["opacity"].initial, ...initial };

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
    },
    children
  );
};

const blankAnimationObj = {
  initial: {},
  animate: {},
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
        return blankAnimationObj;
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
