"use client";

import { Children, isValidElement, useMemo } from "react";
import { invariant } from "../engine/errors.js";
import { usePreparedAnimation } from "../hooks/use-prepared-animation.js";
import { resolveAnimation } from "../internal/resolve.js";
import type { MotionChainProps } from "../types.js";
import { calculateDelays } from "../utils.js";
import { MotionElement } from "./motion.js";

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

  const shared = useMemo(
    () => (animation ? resolveAnimation(animation) : undefined),
    [animation],
  );
  const prepared = usePreparedAnimation(shared?.definition);

  const offsets = calculateDelays(items.length, {
    ...config,
    baseDuration: config.duration ?? 0.1,
    delayLogic: config.customLogic ? "custom" : config.delayLogic,
  });

  return items.map((child, index) => {
    const spec = animation ?? animations?.[index];
    invariant(
      spec,
      "MISSING_ANIMATION",
      "An animation with a mode is required.",
    );
    const { definition, timing } = shared ?? resolveAnimation(spec);
    const source = prepared ? { prepared } : { definition };
    return (
      <MotionElement
        {...props}
        {...source}
        key={isValidElement(child) ? child.key : index}
        elementType={elementType}
        timing={{
          ...timing,
          delay: (spec.delay ?? 0) + (offsets[index] ?? 0),
        }}
        controller={
          controller ?? {
            trigger: true,
          }
        }
      >
        {child}
      </MotionElement>
    );
  });
}
