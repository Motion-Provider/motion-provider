import type { FC } from "react";
import { Children, useMemo } from "react";
import defaults from "../constants/defaults";
import type { MotionChainProps } from "../types";
import { calculateDelay, cn } from "../utils";
import { MotionContainer } from "./motion-container";

/**
 * @description
 * Renders a sequence of "MotionContainer"-wrapped children,
 * computing per-item delays according to the provided "config"
 * and "animations" array. Each child must have a corresponding
 * animation entry; otherwise, MotionChain will log an error and
 * return null. Use MotionChain when you want to sequence animations
 * (e.g., staggered, custom curves, or index-based delay calculation)
 * across a list of children.
 *
 * @description
 * WARNING: MotionChain assumes that your child elements are stable,
 * which means that you SHOULD NOT add or remove children elements after
 * once rendered.
 *
 * @example
 *
 * const items = YOUR_LIST_OF_CHILDREN_THAT_RETURNS_REACT_NODES;
 * const animations = items.map(() => ({
 *    mode: ["scaleZoomIn","fadeIn"],
 *    transition: "gentle",
 *    duration: 2.5,
 * }));
 *
 * <MotionChain
 *   elementType="div"
 *   animations={animations}
 *   config={{ delayLogic: "linear", duration: 0.3 }}
 *   // 'className' passes through per item that is rendered in the chain.
 *   className="your-css-goes-here"
 * >
 *  {items}
 * </MotionChain>
 *
 * @param {MotionChainProps} props The component props.
 * @param {MotionAnimationProps[]} props.animations - Array of animation configs (one per child). Each entry supports `mode`, `transition`, optional `delay`, and optional `duration`.
 * @param {React.ElementType} [props.elementType] - Element type passed through to inner `MotionContainer` (default from defaults.MotionChain.elementType).
 * @param {React.ReactNode[]} props.children - Children to animate; length **must equal** `animations.length`.
 * @param {MotionChainConfigProps} [props.config] - Chain sequencing config (e.g. `delayLogic`, `customLogic`, `duration`).
 * @param {MotionControllerProps} [props.controller] - Centralized animation controller system(CAS) (see `MotionControllerProps` for `trigger`, `reverse`, `isAnimationStopped`, `configView`).
 * @param {string} [props.className] - Optional className forwarded to each produced MotionContainer.
 * @param {...React.HTMLAttributes<HTMLElement>} [props] - Additional HTML attributes forwarded to each MotionContainer.
 *
 * @returns {React.ReactElement | null} Rendered sequence of motion-wrapped children or `null` when `animations.length !== children.length`.
 */
export const MotionChain: FC<MotionChainProps> = ({
  animations,
  config = defaults.MotionChain.config,
  controller = defaults.MotionChain.controller,
  children,
  elementType = defaults.MotionChain.elementType,
  className,
  ...props
}) => {
  const { customLogic, delayLogic, duration } = config;

  const childItem = useMemo(() => Children.toArray(children), [children]);

  const compute = useMemo(() => {
    const checkRegisteredDelay = animations.some(
      (animation) =>
        typeof animation.delay === "undefined" ||
        !animation.delay ||
        typeof animation.delay !== "number"
    );

    if (typeof customLogic === "undefined") {
      return children.map((_, index) => {
        const calculatedDelay = calculateDelay({
          delayLogic,
          index,
          baseDuration: duration,
        });
        const delayTotal = !checkRegisteredDelay
          ? (animations[index].delay || 0) + calculatedDelay
          : calculatedDelay;

        return {
          ...animations[index],
          delay: delayTotal,
        };
      });
    }

    return animations.map((animation, idx) => {
      const calculatedDelay = calculateDelay({
        delayLogic: "custom",
        index: idx,
        baseDuration: duration,
        customLogic,
      });

      return {
        ...animation,
        delay: !checkRegisteredDelay
          ? calculatedDelay + (animation.delay || 0)
          : calculatedDelay,
      };
    });
  }, [animations, children, delayLogic, duration, customLogic]);

  if (animations.length !== children.length) {
    throw new Error(
      `Oops, the number of animations must match with the number of children inside 'MotionChain'. In your case animations.length: ${animations.length} !== children.length: ${children.length}`
    );
  }

  return compute.map((animation, index) => (
    <MotionContainer
      // eslint-disable-next-line react/no-array-index-key
      // biome-ignore lint/suspicious/noArrayIndexKey: static index
      key={index}
      animation={animation}
      controller={controller}
      elementType={elementType}
      className={cn(className)}
      {...props}
    >
      {childItem[index]}
    </MotionContainer>
  ));
};
