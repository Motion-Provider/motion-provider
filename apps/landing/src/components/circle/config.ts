export interface AnalyzerTracerConfig {
  strokeWidth: number;
  beginRadius: number;
  endRadius: number;
  holeRadius: number;
  perspective: number;
  perspectiveOriginY: number;
  rotateXDeg: number;
  svgFraction: number;
  identity: {
    strokeWidth: number;
    cx: number;
    cy: number;
    rSub: number;
  };
}

export default {
  beginRadius: 5,
  endRadius: 45,
  strokeWidth: 0.5,
  holeRadius: 16,
  perspective: 520,
  perspectiveOriginY: 0.4,
  rotateXDeg: 80,
  svgFraction: 0.65,
  identity: {
    strokeWidth: 0.2,
    cx: 50,
    cy: 60,
    rSub: 5,
  },
} as const satisfies AnalyzerTracerConfig;
