"use client";

import { createElement, forwardRef, useCallback, useRef } from "react";
import { invariant } from "../engine/errors.js";
import { useMotion } from "../hooks/use-motion.js";
import type { MotionProps } from "../types.js";

/**
 * Small React adapter for direct animation definitions. Import from motion-provider/lite
 * and pass named presets to omit the full registry. Server HTML stays visible until hydration.
 * Intrinsic HTML/SVG tags only; refs and standard attributes are forwarded to the animated node.
 */
export const Motion = forwardRef<HTMLElement | SVGElement, MotionProps>(
	function Motion(
		{
			definition,
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
			typeof elementType === "string" &&
				/^[a-z][a-zA-Z0-9-]*$/.test(elementType),
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

		useMotion(ref, {
			definition,
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
				ref: setRef,
			},
			children,
		);
	},
);
