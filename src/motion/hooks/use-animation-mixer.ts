import {
  AnimationObjProps,
  UseAnimationMixerProps,
  UseOutputAnimationMixerProps,
} from "../types";
import { useMemo } from "react";

export const useAnimationMixer = ({
  animations: a,
  reverse,
}: UseAnimationMixerProps): UseOutputAnimationMixerProps =>
  useMemo(() => {
    if (!Array.isArray(a)) {
      return reverse
        ? { initial: a.animate, animate: a.initial }
        : { initial: a.initial, animate: a.animate };
    }

    const mergedInitial = a.reduce(
      (acc, anim) => ({ ...acc, ...anim.initial }),
      {} as AnimationObjProps
    );
    const mergedAnimate = a.reduce(
      (acc, anim) => ({ ...acc, ...anim.animate }),
      {} as AnimationObjProps
    );

    return reverse
      ? { initial: mergedAnimate, animate: mergedInitial }
      : { initial: mergedInitial, animate: mergedAnimate };
  }, [a, reverse]);
