import { type AnimationModule, MotionContainer } from "motion-provider";
import type { ModuleProps } from "../../types";

const tint = {
  initial: { filter: "hue-rotate(90deg)" },
  animate: { filter: "hue-rotate(0deg)" },
} as const satisfies AnimationModule;

export default function AnimatedCard({ controller }: ModuleProps) {
  return (
    <MotionContainer
      className="rounded-xl p-6"
      animation={{
        mode: ["fadeUp", "scaleZoomIn", tint],
        transition: "gentle",
      }}
      controller={controller}
    >
      Custom and built-in motion, together.
    </MotionContainer>
  );
}
