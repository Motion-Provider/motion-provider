import { type AnimationModule, MotionContainer } from "motion-provider";
import type { ModuleProps } from "../../types";

const pathAnimation = {
  initial: {
    pathLength: 0,
  },
  animate: {
    pathLength: 1,
  },
} satisfies AnimationModule;

export default function ({ controller }: ModuleProps) {
  return (
    <svg
      viewBox="0 0 600 600"
      width={600}
      height={600}
      className="max-w-[80vw]"
    >
      <title className="sr-only">Motion Circle</title>
      <MotionContainer
        animation={{
          mode: [pathAnimation],
          transition: "gentle",
          duration: 1,
        }}
        elementType="circle"
        className="circle-path"
        cx="100"
        cy="100"
        r="80"
        stroke="var(--color-accent)"
        style={{
          strokeWidth: 10,
          strokeLinecap: "round",
          fill: "transparent",
        }}
        controller={controller}
      />
    </svg>
  );
}
