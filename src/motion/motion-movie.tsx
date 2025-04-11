import { cn } from "../lib/utils";
import React, { FC, useEffect, useMemo, useState } from "react";
import { AnimationKeys, MotionMovieProps } from "./types/index";
import logError from "./utils/getErrorLogs";
import MotionImage from "./motion-image";
const MotionMovie: FC<MotionMovieProps> = ({
  animations,
  config,
  controller,
  fallback,
  wrapperClassName,
  className,
}) => {
  const { enter, exit, transition, duration = 0.5 } = animations;
  const { animationDuration, images, pieces, delayLogic, fn } = config;

  if (images.length === 0) {
    logError({
      error:
        "Images should be a non-empty array, returning fallback component.",
      mod: "error",
      src: "MotionMovie",
    });
    return fallback;
  }
  if (
    typeof enter === "undefined" ||
    !Array.isArray(enter) ||
    enter.length === 0
  ) {
    logError({
      error:
        "Enter animations should be a non-empty array, returning fallback component.",
      mod: "error",
      src: "MotionMovie",
    });
    return fallback;
  }

  if (
    typeof exit === "undefined" ||
    !Array.isArray(exit) ||
    exit.length === 0
  ) {
    logError({
      error:
        "Exit animations should be a non-empty array, returning fallback component.",
      mod: "error",
      src: "MotionMovie",
    });
    return fallback;
  }

  if (animationDuration <= duration) {
    logError({
      mod: "warn",
      error:
        "Animation duration should be greater than transition duration for optimum results.",
      src: "MotionMovie",
    });
  }
  const [time, setTime] = useState<number>(0);
  const [currImgIdx, setCurrImgIdx] = useState<number>(0);
  const [animation, setAnimation] = useState<AnimationKeys[] | AnimationKeys>(
    enter
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const trigger = time % (animationDuration * 2);

      const halfDuration = animationDuration;

      if (trigger === 0) {
        setCurrImgIdx((prev) => (prev + 1) % images.length);
        setAnimation(enter);
      }

      if (trigger === halfDuration) {
        setTimeout(() => setAnimation(exit), (animationDuration / 2) * 1000);
      }
    }
  }, [time, images, animationDuration, enter, exit]);

  return useMemo(
    () => (
      <div className={cn("overflow-hidden h-full w-full", wrapperClassName)}>
        <MotionImage
          animation={{
            ...animations,
            mode: animation,
          }}
          config={{
            ...config,
            img: images[currImgIdx],
            duration,
          }}
          className={cn(className)}
          controller={controller}
        />
      </div>
    ),
    [
      currImgIdx,
      animation,
      images,
      wrapperClassName,
      pieces,
      enter,
      delayLogic,
      fn,
      transition,
      fallback,
    ]
  );
};

export default MotionMovie;
