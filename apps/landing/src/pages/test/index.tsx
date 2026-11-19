import { type AnimationModule, Motion } from "motion-provider";
import type { CSSProperties } from "react";

const draw = {
  initial: {
    strokeDashoffset: 1,
  },
  animate: {
    strokeDashoffset: 0,
  },
} as const satisfies AnimationModule;

const image: CSSProperties = {
  maxWidth: "80vw",
  maxHeight: "80vh",
};

const shape: CSSProperties = {
  strokeWidth: 10,
  strokeLinecap: "round",
  strokeDasharray: "1 1",
  fill: "transparent",
  stroke: "currentColor",
};

const autoplay = { trigger: true };

const timing = (index: number) => ({
  duration: 1.5,
  delay: index * 0.5,
  easing: [0.22, 0.9, 0.36, 0.99] as const,
});

const normalizedPath = { pathLength: 1 };

const diagonal1 = {
  x1: 220,
  y1: 30,
  x2: 360,
  y2: 170,
  ...normalizedPath,
};

const diagonal2 = {
  x1: 220,
  y1: 170,
  x2: 360,
  y2: 30,
  ...normalizedPath,
};

const diagonal3 = {
  x1: 220,
  y1: 230,
  x2: 360,
  y2: 370,
  ...normalizedPath,
};

const diagonal4 = {
  x1: 220,
  y1: 370,
  x2: 360,
  y2: 230,
  ...normalizedPath,
};

const diagonal5 = {
  x1: 220,
  y1: 430,
  x2: 360,
  y2: 570,
  ...normalizedPath,
};

const diagonal6 = {
  x1: 220,
  y1: 570,
  x2: 360,
  y2: 430,
  ...normalizedPath,
};

const roundedRect = {
  rx: 20,
  ...normalizedPath,
};

export default function Page() {
  return (
    <svg width="600" height="600" viewBox="0 0 600 600" style={image}>
      <Motion
        elementType="circle"
        {...normalizedPath}
        className="circle-path"
        cx="100"
        cy="100"
        r="80"
        stroke="var(--hue-1)"
        definition={draw}
        timing={timing(1)}
        style={shape}
        controller={autoplay}
      />

      <Motion
        elementType="line"
        {...diagonal1}
        stroke="var(--hue-6)"
        definition={draw}
        timing={timing(2)}
        style={shape}
        controller={autoplay}
      />

      <Motion
        elementType="line"
        {...diagonal2}
        stroke="var(--hue-6)"
        definition={draw}
        timing={timing(2.5)}
        style={shape}
        controller={autoplay}
      />

      <Motion
        elementType="rect"
        {...roundedRect}
        width="140"
        height="140"
        x="410"
        y="30"
        stroke="var(--hue-4)"
        definition={draw}
        timing={timing(3)}
        style={shape}
        controller={autoplay}
      />

      <Motion
        elementType="circle"
        {...normalizedPath}
        cx="100"
        cy="300"
        r="80"
        stroke="var(--hue-4)"
        definition={draw}
        timing={timing(2)}
        style={shape}
        controller={autoplay}
      />

      <Motion
        elementType="line"
        {...diagonal3}
        stroke="var(--hue-1)"
        definition={draw}
        timing={timing(3)}
        style={shape}
        controller={autoplay}
      />

      <Motion
        elementType="line"
        {...diagonal4}
        stroke="var(--hue-1)"
        definition={draw}
        timing={timing(3.5)}
        style={shape}
        controller={autoplay}
      />

      <Motion
        elementType="rect"
        {...roundedRect}
        width="140"
        height="140"
        x="410"
        y="230"
        stroke="var(--hue-6)"
        definition={draw}
        timing={timing(4)}
        style={shape}
        controller={autoplay}
      />

      <Motion
        elementType="circle"
        {...normalizedPath}
        cx="100"
        cy="500"
        r="80"
        stroke="var(--hue-6)"
        definition={draw}
        timing={timing(3)}
        style={shape}
        controller={autoplay}
      />

      <Motion
        elementType="line"
        {...diagonal5}
        stroke="var(--hue-4)"
        definition={draw}
        timing={timing(4)}
        style={shape}
        controller={autoplay}
      />

      <Motion
        elementType="line"
        {...diagonal6}
        stroke="var(--hue-4)"
        definition={draw}
        timing={timing(4.5)}
        style={shape}
        controller={autoplay}
      />

      <Motion
        elementType="rect"
        {...roundedRect}
        width="140"
        height="140"
        x="410"
        y="430"
        stroke="var(--hue-1)"
        definition={draw}
        timing={timing(5)}
        style={shape}
        controller={autoplay}
      />
    </svg>
  );
}
