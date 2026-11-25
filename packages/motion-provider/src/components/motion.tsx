"use client";

import {
  createElement,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
  useCallback,
  useRef,
} from "react";
import { invariant } from "../engine/errors.js";
import { useMotion } from "../hooks/use-motion.js";
import {
  type PreparedDefinition,
  usePreparedAnimation,
} from "../hooks/use-prepared-animation.js";
import type { MotionProps } from "../types.js";

type MotionElementProps = Omit<MotionProps, "definition"> &
  (
    | { definition: MotionProps["definition"]; prepared?: never }
    | { definition?: never; prepared: PreparedDefinition }
  );

export const MotionElement = forwardRef<
  HTMLElement | SVGElement,
  MotionElementProps
>(function Motion(
  {
    definition,
    prepared,
    timing,
    controller,
    elementType = "div",
    reducedMotion,
    onMotionError,
    onMotionComplete,
    children,
    ...dom
  },
  forwardedRef,
) {
  invariant(
    typeof elementType === "string" && /^[a-z][a-zA-Z0-9-]*$/.test(elementType),
    "INVALID_ELEMENT",
    "elementType must be an intrinsic HTML/SVG tag.",
  );

  const ref = useRef<HTMLElement | SVGElement | null>(null);
  const setRef = useCallback(
    (node: HTMLElement | SVGElement | null) => {
      ref.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  const compiled = usePreparedAnimation(definition, prepared);
  invariant(
    compiled,
    "INVALID_ANIMATION",
    "Provide initial and animate objects.",
  );

  const initialStyle = useMotion(ref, compiled, {
    timing,
    controller,
    elementType,
    reducedMotion,
    onMotionError,
    onMotionComplete,
  });

  return createElement(
    elementType,
    {
      ...dom,
      style: {
        ...dom.style,
        ...initialStyle,
      },
      ref: setRef,
    },
    children,
  );
});

/** Render an intrinsic HTML or SVG element with a direct animation definition. */
export const Motion: ForwardRefExoticComponent<
  MotionProps & RefAttributes<HTMLElement | SVGElement>
> = MotionElement;
