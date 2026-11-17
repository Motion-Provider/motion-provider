import type { AnimationModule } from "motion-provider";
import { MotionContainer } from "motion-provider";
import type { ModuleProps } from "./types";

const tint = {
  initial: { filter: "hue-rotate(90deg)" },
  animate: { filter: "hue-rotate(0deg)" },
} as const satisfies AnimationModule;

export default function MixedState({ controller }: ModuleProps) {
  return (
    <MotionContainer
      className="size-16 rounded-xl bg-accent"
      animation={{ mode: ["fadeUp", "scaleZoomIn", tint], duration: 0.9 }}
      controller={controller}
    />
  );
}
