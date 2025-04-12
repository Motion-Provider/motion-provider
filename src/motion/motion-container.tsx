import { AnimationObjProps, TransitionConfig } from "./types";
import { cn } from "../lib/utils";
import transitions from "./lib/transitions.lib";
import { motion, useInView } from "motion/react";
import React, { FC, memo, useId, useMemo, useRef } from "react";
import { useAnimationMixer } from "./hooks/use-animation-mixer";
import animations from "./lib/animate.lib";
import dynamic from "next/dynamic";
import { MotionContainerProps } from "./types";
import {
  MOTION_PROVIDER_DEFAULTS as defaults,
  MOTION_CONTAINER_ANIMATION_DEFAULT,
  MOTION_CONTAINER_CONTROLLER_DEFAULT,
} from "./lib/defaults.lib";
import logError from "./utils/getErrorLogs";

const Container: FC<MotionContainerProps> = ({
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

  const { configView, isAnimationStopped, trigger, reverse } = controller;
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, configView);
  const id = useId();

  if (typeof animation === "undefined") {
    logError({
      error: "Animation is undefined, returning null.",
      mod: "error",
      src: "MotionContainer",
    });
    return null;
  }

  const animationsToMix = useMemo(() => {
    return Array.isArray(mode)
      ? mode.map((key) => animations[key] || { initial: {}, animate: {} })
      : [animations[mode] || { initial: {}, animate: {} }];
  }, [mode, trigger]);

  const { initial, animate } = useAnimationMixer({
    animations: animationsToMix as AnimationObjProps[],
    reverse,
  });

  const transitionConfig: TransitionConfig = useMemo(() => {
    const defaultTransition = transitions[transition || "default"];
    if (isAnimationStopped) {
      return {
        ...defaultTransition,
        duration: duration || defaultTransition.duration,
        delay: 0,
      };
    }
    return {
      ...defaultTransition,
      duration: duration || defaultTransition.duration,
      delay: delay || defaultTransition.delay,
    };
  }, [isAnimationStopped, trigger]);

  const animationState = useMemo(() => {
    if (isAnimationStopped) {
      return { ...animations["opacity"].animate, ...animate };
    }

    if (typeof trigger !== "undefined") {
      return trigger ? animate : initial;
    }

    return isInView ? animate : initial;
  }, [isAnimationStopped, isInView, initial, animate, trigger]);

  const initialState = useMemo(() => {
    if (isAnimationStopped) {
      return { ...animations["opacity"].initial, ...initial };
    }
    return initial;
  }, [isAnimationStopped, initial]);

  return React.createElement(
    motion[elementType as keyof typeof motion] as React.ElementType,
    {
      className: cn("mc", className),
      ref,
      key: id,
      initial: initialState,
      animate: animationState,
      transition: transitionConfig,
    },
    children
  );
};

const MotionContainer = dynamic(
  () => Promise.resolve(memo(Container as typeof Container)),
  { ssr: false }
);

export default MotionContainer;
