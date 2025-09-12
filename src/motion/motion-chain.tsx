import { cn } from "./lib/utils";
import { MotionChainProps } from "./types";
import defaults from "./constants/defaults";
import logError from "./utils/getErrorLogs";
import { Children, FC, useMemo } from "react";
import MotionContainer from "./motion-container";
import { calculateDelay } from "./utils/calculateDelay";

/**
 * @description
 * MotionChain renders a sequence (chain) of `MotionContainer`-wrapped children,
 * computing per-item delays according to the provided `config` and the
 * `animations` array. Each child must have a corresponding animation entry;
 * otherwise MotionChain will log an error and return `null`.
 *
 * Use MotionChain when you want sequenced animations (staggered, custom curves,
 * or index-based delay calculation) across a list of children.
 *
 * @example
 *
 * const items = Array.from({ length: 5 }, () => <div className="size-12 my-1 bg-stone-700" />);
 * const animations = items.map(() => ({
 *    mode: ["scaleZoomIn","fadeIn"],
 *    transition: "gentle",
 *    duration: 2.5,
 * })) as MotionAnimationProps[]
 *
 * <MotionChain
 *   elementType="div"
 *   animations={animations}
 *   config={{ delayLogic: "linear", duration: 0.3 }}
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

const MotionChain: FC<MotionChainProps> = ({
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
          customLogic,
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
          ? calculatedDelay + animation.delay!
          : calculatedDelay,
      };
    });
  }, [animations, children, delayLogic, duration, customLogic]);

  if (animations.length !== children.length) {
    logError({
      msg: "The number of animations must match with the number of children, returning null.",
      mod: "error",
      src: "MotionChain",
    });
    return null;
  }

  return (
    <>
      {compute.map((animation, index) => (
        <MotionContainer
          key={index}
          animation={animation}
          controller={controller}
          elementType={elementType}
          className={cn(className)}
          {...props}
        >
          {childItem[index]}
        </MotionContainer>
      ))}
    </>
  );
};

export default MotionChain;
