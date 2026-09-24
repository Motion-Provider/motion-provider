"use client";

import { Children, isValidElement } from "react";
import { invariant } from "../engine/errors.js";
import type { MotionAnimationProps, MotionChainProps } from "../types.js";
import { calculateDelays } from "../utils.js";
import { MotionContainer } from "./motion-container.js";

/**
 * Render one animated wrapper per child, retaining React keys through reordering.
 * Choose a shared animation or an animations array matching Children.toArray(children).
 * Stagger offsets are added independently to every item's explicit delay, including zero.
 */
export function MotionChain({
	animations,
	animation,
	config = {},
	children,
	controller,
	elementType = "div",
	...props
}: MotionChainProps) {
	const items = Children.toArray(children);

	invariant(
		items.length > 0,
		"CHAIN_EMPTY",
		"Provide at least one child to MotionChain.",
	);
	invariant(
		!!animation !== !!animations,
		"CHAIN_ANIMATION",
		"Provide exactly one of animation or animations.",
	);
	invariant(
		!animations || animations.length === items.length,
		"CHAIN_LENGTH",
		`Expected ${items.length} animations; received ${animations?.length}.`,
	);

	const offsets = calculateDelays(items.length, {
		...config,
		baseDuration: config.duration ?? 0.1,
		delayLogic: config.customLogic ? "custom" : config.delayLogic,
	});

	return items.map((child, index) => {
		const spec = animations?.[index] ?? (animation as MotionAnimationProps);
		return (
			<MotionContainer
				{...props}
				key={isValidElement(child) ? child.key : index}
				elementType={elementType}
				animation={{
					...spec,
					delay: (spec.delay ?? 0) + (offsets[index] ?? 0),
				}}
				controller={
					controller ?? {
						trigger: true,
					}
				}
			>
				{child}
			</MotionContainer>
		);
	});
}
