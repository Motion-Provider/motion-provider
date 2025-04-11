import { UseInViewOptions } from "motion/react";
import {
  AnimationKeys,
  DelayLogic,
  ImageMotionPieces,
  MotionChainProps,
  MotionContainerProps,
  MotionImageConfigProps,
  MotionImageProps,
  MotionTextProps,
  TransitionKeys,
} from "../types";
import { createElement } from "react";
import { cn } from "../../lib/utils";

const MOTION_CONTAINER_DELAY_DEFAULT = 0 as number,
  MOTION_CONTAINER_DURATION_DEFAULT = 0.5 as number,
  MOTION_CONTAINER_ANIMATION_STOPPED_DEFAULT = false as boolean,
  MOTION_CONTAINER_REVERSE_DEFAULT = false as boolean,
  MOTION_CONTAINER_CONTROLLED_DEFAULT = false as boolean,
  MOTION_CONTAINER_CONFIG_VIEW_DEFAULT = {
    once: true,
    amount: 0.5,
  } as UseInViewOptions,
  MOTION_CONTAINER_ELEMENT_TYPE_DEFAULT = "div" as React.ElementType,
  MOTION_CHAIN_DYNAMICALLY_QUEUED_DEFAULT = false as boolean,
  MOTION_CHAIN_DELAY_LOGIC_DEFAULT = "linear" as DelayLogic,
  MOTION_CHAIN_DURATION_DEFAULT = 0.5 as number,
  MOTION_CHAIN_ELEMENT_TYPE_DEFAULT = "div" as React.ElementType,
  MOTION_IMAGE_PIECES_DEFAULT = 121 as ImageMotionPieces,
  MOTION_IMAGE_FALLBACK_DEFAULT = createElement("div", {
    className: cn("w-full h-full absolute bg-stone-950 animate-pulse"),
  }),
  MOTION_IMAGE_ANIMATION_DURATION_DEFAULT = 3 as number,
  MOTION_IMAGE_TRANSITION_DEFAULT = "smooth" as TransitionKeys,
  MOTION_IMAGE_DELAY_LOGIC_DEFAULT = "sinusoidal" as DelayLogic,
  MOTION_IMAGE_TOTAL_DELAY_DEFAULT = 0 as number,
  MOTION_IMAGE_CONFIG_VIEW_DEFAULT = {
    once: true,
    amount: "some",
  } as UseInViewOptions,
  MOTION_MOVIE_PIECES_DEFAULT = 121 as ImageMotionPieces,
  MOTION_MOVIE_ANIMATION_DURATION_DEFAULT = 2 as number,
  MOTION_MOVIE_CONFIG_VIEW_DEFAULT = {
    once: true,
    amount: "some",
  } as UseInViewOptions,
  MOTION_MOVIE_DELAY_LOGIC_DEFAULT = "sinusoidal" as DelayLogic,
  MOTION_MOVIE_FALLBACK_DEFAULT = createElement("div", {
    className: cn("w-full h-full absolute bg-stone-950 animate-pulse"),
  }),
  MOTION_MOVIE_TOTAL_DELAY_DEFAULT = 0 as number,
  MOTION_MOVIE_TRANSITION_DEFAULT = "smooth" as TransitionKeys,
  MOTION_MOVIE_WRAPPER_CLASSNAME_DEFAULT = "relative" as string,
  MOTION_TEXT_SPACE_DEFAULT = 2 as number,
  MOTION_RECALL_TIMEOUT_DEFAULT = 100;

export const MOTION_PROVIDER_DEFAULTS = {
  MOTION_RECALL_TIMEOUT_DEFAULT,
  MOTION_CHAIN_DELAY_LOGIC_DEFAULT,
  MOTION_CHAIN_DURATION_DEFAULT,
  MOTION_CHAIN_DYNAMICALLY_QUEUED_DEFAULT,
  MOTION_CHAIN_ELEMENT_TYPE_DEFAULT,
  MOTION_CONTAINER_ANIMATION_STOPPED_DEFAULT,
  MOTION_CONTAINER_CONTROLLED_DEFAULT,
  MOTION_CONTAINER_DELAY_DEFAULT,
  MOTION_CONTAINER_DURATION_DEFAULT,
  MOTION_CONTAINER_ELEMENT_TYPE_DEFAULT,
  MOTION_CONTAINER_REVERSE_DEFAULT,
  MOTION_CONTAINER_CONFIG_VIEW_DEFAULT,
  MOTION_IMAGE_ANIMATION_DURATION_DEFAULT,
  MOTION_IMAGE_DELAY_LOGIC_DEFAULT,
  MOTION_IMAGE_FALLBACK_DEFAULT,
  MOTION_IMAGE_PIECES_DEFAULT,
  MOTION_IMAGE_TOTAL_DELAY_DEFAULT,
  MOTION_IMAGE_TRANSITION_DEFAULT,
  MOTION_IMAGE_CONFIG_VIEW_DEFAULT,
  MOTION_MOVIE_ANIMATION_DURATION_DEFAULT,
  MOTION_MOVIE_CONFIG_VIEW_DEFAULT,
  MOTION_MOVIE_DELAY_LOGIC_DEFAULT,
  MOTION_MOVIE_FALLBACK_DEFAULT,
  MOTION_MOVIE_PIECES_DEFAULT,
  MOTION_MOVIE_TOTAL_DELAY_DEFAULT,
  MOTION_MOVIE_TRANSITION_DEFAULT,
  MOTION_MOVIE_WRAPPER_CLASSNAME_DEFAULT,
  MOTION_TEXT_SPACE_DEFAULT,
} as const;

export const MOTION_CHAIN_CONFIG_DEFAULTS = {
  children: [] as React.ReactNode[],
  delayByElement: undefined,
  isDynamicallyQueued: undefined,
  customLogic: undefined,
  delayLogic: MOTION_CHAIN_DELAY_LOGIC_DEFAULT as DelayLogic,
  duration: MOTION_CHAIN_DURATION_DEFAULT,
} as MotionChainProps["config"];

export const MOTION_CHAIN_CONTROLLER_DEFAULTS = {
  configView: MOTION_CONTAINER_CONFIG_VIEW_DEFAULT,
  isAnimationStopped: MOTION_CONTAINER_ANIMATION_STOPPED_DEFAULT,
  isControlled: MOTION_CONTAINER_CONTROLLED_DEFAULT,
  reverse: MOTION_CONTAINER_REVERSE_DEFAULT,
} as MotionChainProps["controller"];

export const MOTION_CONTAINER_CONTROLLER_DEFAULT =
  undefined as MotionContainerProps["controller"];

export const MOTION_CONTAINER_ANIMATION_DEFAULT = {
  mode: ["opacity"] as AnimationKeys[],
  transition: "smooth" as TransitionKeys,
  delay: MOTION_CONTAINER_DELAY_DEFAULT,
  duration: MOTION_CONTAINER_DURATION_DEFAULT,
} as MotionContainerProps["animation"];

export const MOTION_IMAGE_CONFIG_DEFAULT = {
  duration: MOTION_IMAGE_ANIMATION_DURATION_DEFAULT,
  pieces: MOTION_IMAGE_PIECES_DEFAULT,
  img: String(""),
  customLogic: undefined,
  delayByElement: undefined,
  delayLogic: undefined,
  fn: undefined,
} as MotionImageConfigProps;

export const MOTION_IMAGE_ANIMATION_DEFAULT = {
  mode: ["opacity"] as AnimationKeys[],
  transition: "smooth" as TransitionKeys,
  delay: 0,
  duration: 0.5,
} as MotionImageProps["animation"];
