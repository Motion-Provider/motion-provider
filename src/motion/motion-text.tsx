import {
  MOTION_CHAIN_CONFIG_DEFAULTS,
  MOTION_CONTAINER_CONTROLLER_DEFAULT,
} from "./lib/defaults.lib";
import { cn } from "../lib/utils";
import MotionChain from "./motion-chain";
import { MotionTextProps } from "./types";
import logError from "./utils/getErrorLogs";
import React, { createElement, FC, useMemo } from "react";
import getSplittedText from "./utils/getSplittedText";

const MotionText: FC<MotionTextProps> = ({
  animation,
  children,
  config = { ...MOTION_CHAIN_CONFIG_DEFAULTS, mode: "chars" },
  controller = { ...MOTION_CONTAINER_CONTROLLER_DEFAULT },
  elementType,
  className,
  wrapperClassName,
}) => {
  const { mode, space = 2 } = config;

  if (
    typeof children !== "string" ||
    (typeof children === "string" && children.length === 0)
  ) {
    logError({
      error: "Children should be a string and not empty, returning null",
      src: "MotionText",
      mod: "error",
    });
    return null;
  }

  const str = useMemo(
    () =>
      getSplittedText({
        text: children,
        mode,
      }),
    [children, mode]
  );

  const items = str.map((char, idx) => {
    if (char === " ")
      return (
        <span
          className={cn(space >= 1 ? `px-${space}` : `px-[${space}px]`)}
          key={idx}
        />
      );
    return (
      <span className={cn(className)} key={idx}>
        {char}
      </span>
    );
  });

  return createElement(elementType as React.ElementType, {
    className: cn("flex flex-wrap", wrapperClassName),
    children: (
      <MotionChain
        animations={str.map((_) => ({
          ...animation,
          delay: animation.delay || 0,
        }))}
        children={items}
        config={{
          ...config,
          isDynamicallyQueued: true,
        }}
        elementType={"span"}
        controller={controller}
      />
    ),
  });
};

export default MotionText;
