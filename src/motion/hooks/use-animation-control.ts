import { useState, useCallback } from "react";
import { UseAnimationControlProps, UseAnimationProps } from "../types";

export const useAnimationControl = (initial?: UseAnimationControlProps) => {
  const [control, setControl] = useState<UseAnimationProps>({
    stopAnimation: false,
    reverseAnimation: false,
    ...initial,
  });

  const onReverse = useCallback(() => {
    setControl((prev) => ({
      ...prev,
      reverseAnimation: !prev.reverseAnimation,
      stopAnimation: false,
    }));
  }, []);

  const onStop = useCallback(() => {
    setControl((prev) => ({
      ...prev,
      stopAnimation: true,
      reverseAnimation: false,
    }));
  }, []);

  return { control, onReverse, onStop };
};
