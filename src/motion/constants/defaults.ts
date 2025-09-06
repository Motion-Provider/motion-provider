import { createElement } from "react";
import { MotionChainProps, MotionDefaultsProps } from "../types";

export default {
  MotionContainer: {
    controller: {
      configView: { once: true, amount: 0.5 },
      isAnimationStopped: false,
      trigger: undefined,
      reverse: false,
    },
    animation: {
      mode: "opacity",
      transition: "smooth",
      delay: 0,
      duration: 0.5,
    },
    elementType: "div",
    children: undefined,
    className: undefined,
  },
  MotionChain: {
    controller: undefined as MotionChainProps["controller"],
    elementType: "div",
    config: {
      duration: 0.5,
      customLogic: undefined,
      delayLogic: "linear",
    },
  },
  MotionImage: {
    config: {
      duration: 3,
      pieces: 64,
      delayLogic: "sinusoidal",
      customLogic: undefined,
      img: undefined,
      fn: undefined,
    },
    fallback: createElement("div", {
      className: "w-full h-full absolute bg-stone-950 animate-pulse",
    }),
  },
  MotionLink: {
    timer: 2000,
    href: "/",
  },
  MotionText: {
    config: {
      duration: 0.5,
      mode: "chars",
      space: 0,
      delayLogic: "linear",
    },
  },
  MotionMovie: {
    config: {
      pieces: 64,
      images: [],
      animationDuration: 2,
    },
    fallback: createElement("div", {
      className: "w-full h-full absolute bg-stone-950 animate-pulse",
    }),
  },
} as const satisfies MotionDefaultsProps;
