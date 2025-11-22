import type React from "react";
import { createElement, type FC, useMemo } from "react";
import defaults from "../constants/defaults";
import type { MotionTextProps, SplittedTextModes } from "../types";
import { cn } from "../utils";
import { MotionChain } from "./motion-chain";

/**
 * @description
 * Splits a string into inline elements (words or characters)
 * and renders them as a sequenced animation chain via `MotionChain`.
 *
 * Use 'MotionText' when you want centralized character or word-level
 * animated typography.
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
export const MotionText: FC<MotionTextProps> = ({
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

  const tokens = useMemo(
    () =>
      getSplittedText({
        text: children as string,
        mode,
      }),
    [children, mode]
  );
  const unit = typeof space === "number" ? `${space}px` : space;
  const itemClassName = cn(className, "inline-block align-baseline");

  const itemStyle = {
    display: "inline-block",
    whiteSpace: "pre",
    marginRight: unit ?? undefined,
  } as React.CSSProperties;

  if (typeof children !== "string" || children.length === 0)
    throw new Error(
      "Oops, 'MotionText' component requires a 'children' prop and must be a non-empty 'string', check the type error."
    );

  if (!elementType)
    throw new Error(
      "Oops, 'MotionText' component requires a valid 'elementType' prop, check the type error."
    );

  return createElement(
    elementType as React.ElementType,
    {
      className: cn("flex flex-wrap", wrapperClassName),
    },
    <MotionChain
      animations={tokens.map(() => animation)}
      config={config}
      elementType="span"
      controller={controller}
      className={itemClassName}
      style={itemStyle}
      {...props}
    >
      {tokens.map((t) => (t === " " ? "\u00A0" : t))}
    </MotionChain>
  );
};

type SplitTextProps = {
  text: string;
  mode?: SplittedTextModes;
};

function getSplittedText(props: SplitTextProps): string[] {
  const str: string[] = [];
  const { text, mode = "chars" } = props;

  if (!text || typeof text !== "string")
    throw new Error(
      "Oops, probably you forgot to pass a text child(e.g. '<MotionText>I am a text</MotionText>')?"
    );
  else if (mode === "words" && !text.includes(" "))
    throw new Error(
      "Oops, probably you assigned 'mode' prop as 'words' inside a 'MotionText' component but have you forgotten to add a space(e.g. '<MotionText>I am a text</MotionText>')?"
    );
  else {
    if (text.includes(" ")) {
      const words = text.split(/\s+/);

      words.forEach((w) => {
        str.push(w, " ");
      });

      return mode === "words" ? str.slice(0, -1) : str.join("").split("");
    } else {
      return text.split("");
    }
  }
}
