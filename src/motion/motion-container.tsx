import {
  AnimationKeys,
  AnimationObjProps,
  TransitionConfig,
  TransitionKeys,
} from "./types";
import { cn } from "../lib/utils";
import transitions from "./lib/transitions.lib";
import { motion, useInView } from "motion/react";
import React, { FC, useId, useMemo, useRef } from "react";
import { useAnimationMixer } from "./hooks/use-animation-mixer";
import animations from "./lib/animate.lib";
import { MotionContainerProps } from "./types";
import logError from "./utils/getErrorLogs";

const MotionContainer: FC<MotionContainerProps> = ({
  animation = {
    mode: ["opacity"] as AnimationKeys[],
    transition: "smooth" as TransitionKeys,
    delay: 0,
    duration: 0.5,
  },
  controller = {
    configView: {
      once: false,
      amount: 0.5,
    },
    isAnimationStopped: false,
    reverse: false,
    trigger: false,
  } as MotionContainerProps["controller"],
  children,
  elementType = "div",
  className,
}) => {
  const { mode, transition, delay, duration = 0.5 } = animation;

  const { configView, isAnimationStopped, trigger, reverse } = controller!;
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

  const MotionElement = motion[
    elementType as keyof typeof motion
  ] as React.ElementType;

  if (!MotionElement) {
    logError({
      error: `Invalid motion elementType: '${elementType}'`,
      mod: "error",
      src: "MotionContainer",
    });
    return null;
  }
  return React.createElement(
    MotionElement,
    {
      className: cn(`motion-container`, className),
      ref,
      key: id,
      initial: initialState,
      animate: animationState,
      transition: transitionConfig,
    },
    children
  );
};

export default MotionContainer;
