import { cn } from "./lib/utils";
import MotionImage from "./motion-image";
import logError from "./utils/getErrorLogs";
import { MotionMovieProps } from "./types";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import defaults from "./constants/defaults";
import { AnimationKeys } from "./constants/animations";

/**
 * @description
 * MotionMovie plays a sequence of images (like a simple movie) by rendering
 * a `MotionImage` for the currently active frame and cycling through `images`
 * using `animationDuration`. Each frame is animated using the provided
 * `animations.enter` and `animations.exit` arrays.
 *
 * Key behaviours:
 * - Preloads `config.images` on mount.
 * - Cycles frames on an interval derived from `animationDuration`.
 * - Triggers `enter` animations at frame change and `exit` animations at mid-cycle.
 * - Warns if `animationDuration <= transition duration` for sub-optimal timing.
 * - Falls back to `fallback` component when `images`, `enter`, or `exit` are invalid.
 *
 * @example
 * const images = ["PATH_TO_IMAGE_1", "PATH_TO_IMAGE_2"];
 *
 *  <MotionMovie
 *    animations={{
 *      enter: ["filterBlurIn", "fadeIn"],
 *      exit: ["fadeOut"],
 *      transition: "smooth",
 *      duration: 1,
 *    }}
 *    images={images}
 *    config={{
 *      pieces: 64,
 *      images: images,
 *      animationDuration: 5,
 *      delayLogic: "sinusoidal",
 *    }}
 *    wrapperClassName="size-[500px] z-50 rounded-lg absolute"
 *    className="size-full"
 *    fallback={<div className="size-96 animate-pulse bg-stone-800 rounded-lg" />}
 *  />
 * );
 *
 * @param {MotionMovieProps} props The component props.
 * @param {MotionMovieAnimationsProps} props.animations - Enter/exit animation sets and shared transition settings. `enter` and `exit` must be non-empty arrays.
 * @param {MotionMovieConfigProps} [props.config] - Movie config: `images` (string[]), `animationDuration` (seconds), plus any inherited motion-image config.
 * @param {MotionControllerProps} [props.controller] - Centralized controller (see `MotionControllerProps` for `trigger`, `reverse`, `isAnimationStopped`, `configView`).
 * @param {React.ReactNode} [props.fallback] - Fallback node returned when validation fails (defaults from defaults.MotionMovie.fallback).
 * @param {string} [props.wrapperClassName] - ClassName applied to the outer wrapper (overflow-hidden container).
 * @param {string} [props.className] - ClassName forwarded to the inner MotionImage / MotionImage pieces.
 * @param {...React.HTMLAttributes<HTMLElement>} [props] - Additional HTML attributes forwarded to the underlying MotionImage / MotionImage pieces.
 *
 * @returns {React.ReactElement | null} A wrapper containing a `MotionImage` for the current frame, or the fallback/`null` on invalid input.
 */
const MotionMovie: FC<MotionMovieProps> = ({
  animations,
  config = defaults.MotionMovie.config,
  controller,
  fallback = defaults.MotionMovie.fallback,
  wrapperClassName,
  className,
  ...props
}) => {
  const { enter, exit, transition, duration = 0.5 } = animations;
  const { animationDuration, images } = config;

  const [currImgIdx, setCurrImgIdx] = useState<number>(0);
  const [animation, setAnimation] = useState<AnimationKeys[] | AnimationKeys>(
    enter
  );

  const tickRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);
  const exitTimeoutRef = useRef<number | null>(null);

  if (animationDuration <= duration) {
    logError({
      mod: "warn",
      msg: "Animation duration should be greater than transition duration for optimum results.",
      src: "MotionMovie",
    });
  }

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

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
  }, [images.length, animationDuration, enter, exit]);

  const motionImageAnimation = useMemo(
    () => ({ transition, duration, mode: animation }),
    [transition, duration, animation]
  );

  const motionImageConfig = useMemo(
    () => ({ ...config, img: images[currImgIdx], duration }),
    [config, images, currImgIdx, duration]
  );

  if (!Array.isArray(images) || images.length === 0) {
    logError({
      msg: "Images should be a non-empty array, returning fallback component.",
      mod: "error",
      src: "MotionMovie",
    });
    return <>{fallback ?? null}</>;
  }
  if (!Array.isArray(enter) || enter.length === 0) {
    logError({
      msg: "Enter animations should be a non-empty array, returning fallback component.",
      mod: "error",
      src: "MotionMovie",
    });
    return <>{fallback ?? null}</>;
  }
  if (!Array.isArray(exit) || exit.length === 0) {
    logError({
      msg: "Exit animations should be a non-empty array, returning fallback component.",
      mod: "error",
      src: "MotionMovie",
    });
    return <>{fallback ?? null}</>;
  }
  return (
    <div className={cn("overflow-hidden", wrapperClassName)}>
      <MotionImage
        animation={motionImageAnimation}
        config={motionImageConfig}
        wrapperClassName={wrapperClassName}
        className={cn(className)}
        controller={controller}
        {...props}
      />
    </div>
  );
};

export default MotionMovie;
