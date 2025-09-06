import defaults from "./constants/defaults";
import { cn } from "./lib/utils";
import { MotionChainProps } from "./types";
import logError from "./utils/getErrorLogs";
import { Children, FC, useMemo } from "react";
import MotionContainer from "./motion-container";
import { calculateDelay } from "./utils/calculateDelay";

const MotionChain: FC<MotionChainProps> = ({
  animations,
  config = defaults.MotionChain.config,
  controller = { ...defaults.MotionChain.controller },
  children,
  elementType = defaults.MotionChain.elementType,
  className,
  ...props
}) => {
  const { delayByElement, customLogic, delayLogic, duration } = config;

  const compute = useMemo(() => {
    if (
      typeof delayByElement === "undefined" ||
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
  }, [animations, children, delayLogic, delayByElement, duration, customLogic]);

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
          {...props}
        >
          {childItem[index]}
        </MotionContainer>
      ))}
    </>
  );
};

export default MotionChain;
