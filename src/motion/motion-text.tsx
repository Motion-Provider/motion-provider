import { cn } from "./lib/utils";
import MotionChain from "./motion-chain";
import { MotionTextProps } from "./types";
import logError from "./utils/getErrorLogs";
import getSplittedText from "./utils/getSplittedText";
import React, { createElement, FC, useMemo } from "react";

const MotionText: FC<MotionTextProps> = ({
  animation,
  children,
  config = {
    mode: "chars",
    duration: 0.5,
    delayLogic: "linear",
    delayByElement: undefined,
    isDynamicallyQueued: undefined,
    customLogic: undefined,
  },
  controller,
  elementType,
  className,
  wrapperClassName,
  ...props
}) => {
  const { mode, space = 0 } = config;
  const str = useMemo(
    () =>
      getSplittedText({
        text: children as string,
        mode,
      }),
    [children, mode]
  );

  const unit = typeof space === "number" ? `${space}px` : space;

  const items = str.map((char, idx) => {
    const isSpace = char === " ";
    return (
      <span
        key={idx}
        className={cn(className)}
        style={{
          display: "inline-block",
          marginRight: unit,
        }}
      >
        {isSpace ? "\u00A0" : char}
      </span>
    );
  });

  if (
    typeof children !== "string" ||
    (typeof children === "string" && children.length === 0)
  ) {
    logError({
      msg: "Children should be a string and not empty, returning null",
      src: "MotionText",
      mod: "error",
    });
    return null;
  }

  if (!elementType) {
    logError({
      msg: "elementType prop is required, returning null",
      src: "MotionText",
      mod: "error",
    });
    return null;
  }

  return createElement(
    elementType as React.ElementType,
    {
      className: cn("flex flex-wrap", wrapperClassName),
    },
    <MotionChain
      animations={str.map(() => ({
        ...animation,
        delay: animation.delay || 0,
      }))}
      config={{
        ...config,
        isDynamicallyQueued: true,
      }}
      elementType="span"
      controller={controller}
      {...props}
    >
      {items}
    </MotionChain>
  );
};

export default MotionText;
