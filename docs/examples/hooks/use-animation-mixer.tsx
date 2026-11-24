"use client";

import { Motion, useAnimationMixer } from "motion-provider";

const modules = [
  { initial: { opacity: 0 }, animate: { opacity: 1 } },
  { initial: { transform: "translateY(16px)" }, animate: { transform: "translateY(0)" } },
] as const;

export default function Demo() {
  const definition = useAnimationMixer({ animations: modules });
  return <Motion definition={definition}>Mixed entrance</Motion>;
}
