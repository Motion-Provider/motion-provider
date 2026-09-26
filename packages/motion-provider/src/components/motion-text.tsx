"use client";

import { createElement } from "react";
import { splitText } from "../internal/text.js";
import type { MotionTextProps } from "../types.js";
import { MotionChain } from "./motion-chain.js";
/**
 * Split text into graphemes or words while retaining whitespace and natural wrapping.
 * Assistive technology gets one unsplit copy; visual tokens are aria-hidden.
 * className styles each token; wrapperClassName and standard DOM props style the wrapper.
 */
export function MotionText({
  animation,
  children,
  config = {},
  controller,
  elementType = "span",
  wrapperClassName,
  className,
  reducedMotion,
  onMotionError,
  onMotionComplete,
  ...props
}: MotionTextProps) {
  const tokens = splitText(children, config.mode);
  return createElement(
    elementType,
    {
      ...props,
      className: wrapperClassName,
    },
    <span
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
        border: 0,
      }}
    >
      {children}
    </span>,
    <span aria-hidden="true">
      <MotionChain
        animation={animation}
        reducedMotion={reducedMotion}
        onMotionError={onMotionError}
        onMotionComplete={onMotionComplete}
        config={config}
        controller={controller ?? {}}
        elementType="span"
        className={className}
        style={{
          display: "inline-block",
          whiteSpace: "pre",
          marginRight: config.space,
        }}
      >
        {tokens}
      </MotionChain>
    </span>,
  );
}
