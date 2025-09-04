import { cn } from "./lib/utils";
import MotionImage from "./motion-image";
import logError from "./utils/getErrorLogs";
import { AnimationKeys, MotionMovieProps } from "./types";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";

const MotionMovie: FC<MotionMovieProps> = ({
  animations,
  config,
  controller,
  fallback,
  wrapperClassName,
  className,
}) => {
  const { enter, exit, transition, duration = 0.5 } = animations;
  const { animationDuration = 2, images = [] } = config;

  if (!Array.isArray(images) || images.length === 0) {
    logError({
      error:
        "Images should be a non-empty array, returning fallback component.",
      mod: "error",
      src: "MotionMovie",
    });
    return <>{fallback ?? null}</>;
  }
  if (!Array.isArray(enter) || enter.length === 0) {
    logError({
      error:
        "Enter animations should be a non-empty array, returning fallback component.",
      mod: "error",
      src: "MotionMovie",
    });
    return <>{fallback ?? null}</>;
  }
  if (!Array.isArray(exit) || exit.length === 0) {
    logError({
      error:
        "Exit animations should be a non-empty array, returning fallback component.",
      mod: "error",
      src: "MotionMovie",
    });
    return <>{fallback ?? null}</>;
  }

  if (animationDuration <= duration) {
    logError({
      mod: "warn",
      error:
        "Animation duration should be greater than transition duration for optimum results.",
      src: "MotionMovie",
    });
  }

  const [currImgIdx, setCurrImgIdx] = useState<number>(0);
  const [animation, setAnimation] = useState<AnimationKeys[] | AnimationKeys>(
    enter
  );

  const tickRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);
  const exitTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images.join("|")]);

  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (exitTimeoutRef.current) {
      window.clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }

    tickRef.current = 0;
    setAnimation(enter);

    intervalRef.current = window.setInterval(() => {
      tickRef.current += 1;

      const cycle = Math.max(1, Math.round(animationDuration * 2));
      const trigger = tickRef.current % cycle;

      const halfDuration = Math.round(animationDuration);

      if (trigger === 0) {
        setCurrImgIdx((prev) => (prev + 1) % images.length);
        setAnimation(enter);
      }

      if (trigger === halfDuration) {
        if (exitTimeoutRef.current) {
          window.clearTimeout(exitTimeoutRef.current);
        }
        const halfDelayMs = Math.round((animationDuration / 2) * 1000);
        exitTimeoutRef.current = window.setTimeout(() => {
          setAnimation(exit);
        }, halfDelayMs);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (exitTimeoutRef.current) {
        window.clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }
    };
  }, [images.length, animationDuration, enter.join("|"), exit.join("|")]);

  const motionImageAnimation = useMemo(
    () => ({ transition, duration, mode: animation }),
    [transition, duration, animation]
  );

  const motionImageConfig = useMemo(
    () => ({ ...config, img: images[currImgIdx], duration }),
    [config, images[currImgIdx], duration]
  );

  return (
    <div className={cn("overflow-hidden", wrapperClassName)}>
      <MotionImage
        animation={motionImageAnimation}
        config={motionImageConfig}
        wrapperClassName={wrapperClassName}
        className={cn(className)}
        controller={controller}
      />
    </div>
  );
};

export default MotionMovie;
