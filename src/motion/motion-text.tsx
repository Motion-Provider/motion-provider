import defaults from "./constants/defaults";
import { cn } from "./lib/utils";
import MotionChain from "./motion-chain";
import { MotionTextProps } from "./types";
import logError from "./utils/getErrorLogs";
import getSplittedText from "./utils/getSplittedText";
import React, { createElement, FC, useMemo } from "react";

/**
 * @description
 * MotionText splits a string into inline elements (words or characters)
 * and renders them as a sequenced animation chain via `MotionChain`.
 *
 * It converts the provided `children` string into a list of items using
 * `getSplittedText` and maps each item to a `MotionChain` animation entry.
 * Use MotionText when you want character- or word-level animated typography
 * with centralized controller support.
 *
 * @example
 * <MotionText
 *    elementType="p"
 *    animation={{
 *      mode: ["filterBlurIn","fadeDown"],
 *      transition: "smooth",
 *      duration: 1,
 *    }}
 *    config={{
 *      duration: 0.12,
 *      mode: "chars",
 *      delayLogic: "linear",
 *    }}
 *  >
 *    Hello World!
 *  </MotionText>
 *
 * @param {MotionTextProps} props The component props.
 * @param {MotionAnimationProps} props.animation - Animation config applied to each split item (supports `mode`, `transition`, `delay`, `duration`).
 * @param {React.ReactNode} props.children - **Must be a non-empty string**. MotionText will log an error and return `null` for non-string or empty values.
 * @param {MotionTextConfigProps} [props.config] - Splitting and sequencing config: `mode` ("words" | "chars"), optional `space` between items, and chain timing.
 * @param {MotionControllerProps} [props.controller] - Centralized animation controller (see `MotionControllerProps`).
 * @param {React.ElementType} props.elementType - Element type used as the wrapper for the text (required; MotionText will log an error and return `null` if omitted).
 * @param {string} [props.className] - ClassName applied to each split item (span).
 * @param {string} [props.wrapperClassName] - ClassName applied to the outer wrapper element.
 * @param {...React.HTMLAttributes<HTMLElement>} [props] - Additional HTML attributes forwarded to the inner MotionChain / wrapper.
 *
 * @returns {React.ReactElement | null} A wrapped element containing an animated `MotionChain` of split text items, or `null` on invalid input.
 */
const MotionText: FC<MotionTextProps> = ({
  animation,
  children,
  config = defaults.MotionText.config,
  controller,
  elementType,
  className,
  wrapperClassName,
  ...props
}) => {
  const { mode, space } = config;
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
      className: cn("flex flex-wrap ", wrapperClassName),
    },
    <MotionChain
      animations={str.map(() => ({
        ...animation,
        delay: animation.delay || 0,
      }))}
      config={config}
      elementType="span"
      controller={controller}
      {...props}
    >
      {items}
    </MotionChain>
  );
};

export default MotionText;
