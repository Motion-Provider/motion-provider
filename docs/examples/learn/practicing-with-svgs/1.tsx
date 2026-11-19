import { type AnimationModule, MotionChain } from "motion-provider";
import type { ModuleProps } from "../../types";
import { shapeDefinitions } from "./data";

const draw = {
  initial: {
    strokeDashoffset: "1",
  },
  animate: {
    strokeDashoffset: "0",
  },
} as const satisfies AnimationModule;

const strokePalette = [
  "var(--color-success)",
  "var(--color-danger)",
  "var(--color-accent)",
] as const;

const shapes = shapeDefinitions.map((shape) => ({
  id: shape.id,
  elementType: shape.elementType,
  props: {
    ...shape.props,
    stroke: strokePalette[Math.floor(Math.random() * strokePalette.length)]!,
  },
}));

export default function ({ controller }: ModuleProps) {
  return (
    <svg
      width={600}
      height={600}
      viewBox="0 0 600 600"
      className="size-60 max-w-full mt-12"
      role="img"
      aria-labelledby="path-drawing-title"
    >
      <title id="path-drawing-title">Practicing with SVG</title>
      <MotionChain
        animations={shapes.map((_, i) => ({
          mode: draw,
          delay: i * 0.25,
          duration: 0.88,
          transition: "gentle",
        }))}
        config={{
          duration: 0.24,
          delayLogic: "sinusoidal",
        }}
        elementType="g"
        controller={controller}
      >
        {shapes.map(({ id, elementType: Component, props }) => (
          <Component
            key={id}
            {...props}
            style={{
              strokeWidth: 10,
              strokeLinecap: "round",
              strokeDasharray: "1 1",
              fill: "none",
            }}
          />
        ))}
      </MotionChain>
    </svg>
  );
}
