import { cn } from "./lib/utils";
import { MotionChainProps } from "./types";
import defaults from "./constants/defaults";
import logError from "./utils/getErrorLogs";
import { Children, FC, useMemo } from "react";
import MotionContainer from "./motion-container";
import { calculateDelay } from "./utils/calculateDelay";

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

  const compute = useMemo(() => {
    const checkRegisteredDelay = animations.every(
      (animation) =>
        typeof animation.delay !== "undefined" &&
        animation.delay &&
        typeof animation.delay === "number"
    );

    if (typeof customLogic === "undefined" && checkRegisteredDelay) {
      return children.map((_, index) => {
        const calculatedDelay = calculateDelay({
          delayLogic,
          index,
          baseDuration: duration,
          customLogic,
        });

        const delayTotal = animations[index].delay! + calculatedDelay;
        return {
          ...animations[index],
          delay: delayTotal,
        };
      });
    }

    return animations.map((animation, idx) => ({
      ...animation,
      delay: calculateDelay({
        delayLogic: "custom",
        index: idx,
        baseDuration: duration,
        customLogic,
      }),
    }));
  }, [animations, children, delayLogic, duration, customLogic]);

  const childItem = useMemo(() => Children.toArray(children), [children]);

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
