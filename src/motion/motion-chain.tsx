import {
  MOTION_CHAIN_CONFIG_DEFAULTS,
  MOTION_CHAIN_CONTROLLER_DEFAULTS,
} from "./lib/defaults.lib";
import { cn } from "./lib/utils";
import { MotionChainProps } from "./types";
import logError from "./utils/getErrorLogs";
import { Children, FC, useMemo } from "react";
import MotionContainer from "./motion-container";
import { calculateDelay } from "./utils/calculateDelay";

const MotionChain: FC<MotionChainProps> = ({
  animations,
  config = { ...MOTION_CHAIN_CONFIG_DEFAULTS },
  controller = { ...MOTION_CHAIN_CONTROLLER_DEFAULTS },
  children,
  elementType = "div",
  className,
}) => {
  const {
    delayByElement,
    isDynamicallyQueued,
    customLogic,
    delayLogic = "linear",
    duration = MOTION_CHAIN_CONFIG_DEFAULTS.duration,
  } = config;

  const compute = useMemo(() => {
    if (
      (isDynamicallyQueued && typeof delayByElement === "undefined") ||
      typeof customLogic === "undefined"
    ) {
      return children.map((_, index) => {
        const calculatedDelay = calculateDelay({
          delayLogic,
          index,
          baseDuration: duration,
          customLogic,
        });
        return {
          ...animations[index],
          delay: delayByElement || calculatedDelay,
        };
      });
    }
    return animations.map((animation, idx) => ({
      ...animation,
      delay:
        delayByElement ??
        calculateDelay({
          delayLogic: "custom",
          index: idx,
          baseDuration: duration,
          customLogic,
        }),
    }));
  }, [
    animations,
    children,
    delayLogic,
    delayByElement,
    duration,
    customLogic,
    isDynamicallyQueued,
  ]);

  const childItem = useMemo(() => Children.toArray(children), [children]);

  if (animations.length !== children.length) {
    logError({
      msg: "The number of animations must match the number of children, returning null.",
      mod: "warn",
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
        >
          {childItem[index]}
        </MotionContainer>
      ))}
    </>
  );
};

export default MotionChain;
