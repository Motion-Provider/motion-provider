import { shapeDefinitions } from "./data";

const SVGElements = {
  circle: "circle",
  line: "line",
  rect: "rect",
} as const;

const shapes = shapeDefinitions.map((shape) => ({
  ...shape,
  stroke: "var(--color-accent, #8b5cf6)",
}));

export default function () {
  return (
    <svg
      width={600}
      height={600}
      viewBox="0 0 600 600"
      className="size-60 max-w-full mt-12"
      role="img"
      aria-label="SVG shapes illustration"
    >
      {shapes.map(({ id, elementType, props, stroke }) => {
        const Component = SVGElements[elementType];

        return (
          <Component
            key={id}
            {...props}
            pathLength={1}
            stroke={stroke}
            style={{
              strokeWidth: 10,
              strokeLinecap: "round",
              strokeDasharray: "1 1",
              strokeDashoffset: 0,
              fill: "none",
            }}
          />
        );
      })}
    </svg>
  );
}
