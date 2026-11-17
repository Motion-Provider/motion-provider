import type { AnimationModule } from "motion-provider";
import { Motion } from "motion-provider";
import type { ModuleProps } from "./types";

const pulseIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: [0.8, 1.15, 1] },
} as const satisfies AnimationModule;

export default function CustomState({ controller }: ModuleProps) {
  return (
    <Motion
      className="size-16 rounded-full bg-accent"
      definition={pulseIn}
      timing={{ duration: 0.8, easing: "easeOut" }}
      controller={controller}
    />
  );
}
