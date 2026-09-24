"use client";

import { forwardRef } from "react";
import { resolveAnimation } from "../internal/resolve.js";
import type { MotionContainerProps } from "../types.js";
import { Motion } from "./motion.js";
/**
 * Animate an HTML/SVG node with one or more named presets. In-view entry defaults to
 * 50% visibility and runs once. Inline equivalent animation objects do not restart playback.
 * Use controller.trigger for state-driven playback or controller.scroll for scrubbing.
 */
export const MotionContainer = forwardRef<
	HTMLElement | SVGElement,
	MotionContainerProps
>(function MotionContainer({ animation, ...props }, ref) {
	const { definition, timing } = resolveAnimation(animation);
	return (
		<Motion {...props} definition={definition} timing={timing} ref={ref} />
	);
});
