"use client";

import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import type { AnimationModule, AnimationObjProps } from "./types";

type UseAnimationProps = {
  stopAnimation: boolean;
  reverseAnimation?: boolean;
};

type UseAnimationStateProps = {
  isAnimationStopped: boolean;
  reverse: boolean;
};

type UseAnimationMixerProps = {
  animations: AnimationModule[] | AnimationModule;
  reverse?: boolean;
};

type UseAnimationActionTypes =
  | { type: "IMMEDIATE_STOP" }
  | { type: "FOLLOW_STOP" }
  | { type: "IMMEDIATE_RESET" }
  | { type: "FOLLOW_RESET" }
  | { type: "UPDATE"; payload: { reverseAnimation: boolean } };

type UseOutputAnimationMixerProps = {
  initial: AnimationObjProps;
  animate: AnimationObjProps;
};

const recallDuration = 500;

const useAnimationControl = (initial?: Partial<UseAnimationProps>) => {
  const [control, setControl] = useState<UseAnimationProps>({
    stopAnimation: false,
    reverseAnimation: false,
    ...initial,
  });

  const onReverse = useCallback(() => {
    setControl((prev) => ({
      ...prev,
      reverseAnimation: !prev.reverseAnimation,
      stopAnimation: false,
    }));
  }, []);

  const onStop = useCallback(() => {
    setControl((prev) => ({
      ...prev,
      stopAnimation: true,
      reverseAnimation: false,
    }));
  }, []);

  return { control, onReverse, onStop };
};

const useAnimationMixer = ({
  animations: a,
  reverse,
}: UseAnimationMixerProps): UseOutputAnimationMixerProps =>
  useMemo(() => {
    if (!Array.isArray(a)) {
      return reverse
        ? { initial: a.animate, animate: a.initial }
        : { initial: a.initial, animate: a.animate };
    }

    const mergedInitial = merge("initial", a);
    const mergedAnimate = merge("animate", a);

    return reverse
      ? { initial: mergedAnimate, animate: mergedInitial }
      : { initial: mergedInitial, animate: mergedAnimate };
  }, [a, reverse]);

function merge(key: "initial" | "animate", animation: AnimationModule[]) {
  const out = {} as AnimationObjProps;
  for (const anim of animation) {
    const part = anim[key];
    if (part) Object.assign(out, part);
  }
  return out;
}

const useAnimation = ({
  stopAnimation = false,
  reverseAnimation = false,
}: UseAnimationProps): UseAnimationStateProps => {
  const [state, dispatch] = useReducer(animationReducer, {
    isAnimationStopped: false,
    reverse: false,
  });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (stopAnimation) {
      if (!reverseAnimation) {
        dispatch({ type: "IMMEDIATE_STOP" });
        timeout = setTimeout(() => {
          dispatch({ type: "FOLLOW_STOP" });
        }, recallDuration);
      } else {
        dispatch({ type: "IMMEDIATE_RESET" });
        timeout = setTimeout(() => {
          dispatch({ type: "FOLLOW_RESET" });
        }, recallDuration);
      }
    } else {
      dispatch({ type: "UPDATE", payload: { reverseAnimation } });
    }

    return () => clearTimeout(timeout);
  }, [stopAnimation, reverseAnimation]);

  return state;
};

function animationReducer(
  state: UseAnimationStateProps,
  action: UseAnimationActionTypes
): UseAnimationStateProps {
  switch (action.type) {
    case "IMMEDIATE_STOP":
      return { isAnimationStopped: true, reverse: true };
    case "FOLLOW_STOP":
      return { isAnimationStopped: true, reverse: false };
    case "IMMEDIATE_RESET":
      return { isAnimationStopped: true, reverse: false };
    case "FOLLOW_RESET":
      return { isAnimationStopped: false, reverse: false };
    case "UPDATE":
      return {
        isAnimationStopped: false,
        reverse: action.payload.reverseAnimation,
      };
    default:
      return state;
  }
}

export { useAnimation, useAnimationControl, useAnimationMixer };
