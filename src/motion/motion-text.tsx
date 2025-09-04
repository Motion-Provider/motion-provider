import MotionChain from "./motion-chain";
import { MotionTextProps } from "./types";
import logError from "./utils/getErrorLogs";
import React, { createElement, FC, useMemo } from "react";
import getSplittedText from "./utils/getSplittedText";

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
}) => {
  const { mode, space = 0 } = config;

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

  const unit = typeof space === "number" ? `${space}px` : space;

  const items = str.map((char, idx) => {
    const isSpace = char === " ";
    return (
      <span
        key={idx}
        className={className}
        style={{
          display: "inline-block",
          marginRight: unit,
        }}
      >
        {isSpace ? "\u00A0" : char}
      </span>
    );
  });

  return createElement(elementType as React.ElementType, {
    className: `flex flex-wrap ${wrapperClassName}`,
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
