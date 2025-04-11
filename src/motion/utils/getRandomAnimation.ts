import animations from "../lib/animate.lib";
import {
  AnimationKeys,
  GetRandomAnimation,
  GetRandomAnimationProps,
} from "../types";
import logError from "./getErrorLogs";

export default function getRandomAnimation({
  count,
}: GetRandomAnimationProps): GetRandomAnimation {
  let a: AnimationKeys[] = [];

  if (!count || count <= 0) {
    logError({
      error: "Count should be greater than 0, returning undefined.",
      src: "getRandomAnimation",
      mod: "error",
    });
    return undefined;
  }

  for (let i = 0; i < count; i++) {
    a.push(
      Object.keys(animations)[
        Math.floor(Math.random() * Object.keys(animations).length)
      ] as AnimationKeys
    );
  }
  return a as GetRandomAnimation;
}
