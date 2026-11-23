import { Motion, type AnimationModule } from "motion-provider";
import type { ModuleProps } from "../../types";

const pulseIn = {
  initial: {
    opacity: 0,
    scale: 0.84,
  },
  animate: {
    opacity: 1,
    scale: [0.84, 1.06, 1],
  },
} as const satisfies AnimationModule;

export default function CustomReveal({ controller }: ModuleProps) {
  return (
    <Motion
      className="grid size-20 place-items-center rounded-2xl bg-accent text-sm font-semibold text-background"
      definition={pulseIn}
      timing={{ duration: 0.8, easing: "ease-out" }}
      controller={controller}
    >
      Ready
    </Motion>
  );
}
