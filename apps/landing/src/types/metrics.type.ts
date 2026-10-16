import type { CSSProperties } from "react";

export type MetricLibrary = "motion-provider" | "motion" | "gsap" | "animejs";
export type MetricSizeKey = "gzipBytes" | "minifiedBytes";
export interface MetricItem {
  readonly id: string;
  readonly library: MetricLibrary;
  readonly label: string;
  readonly minifiedBytes: number;
  readonly gzipBytes: number;
  component?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export type MetricFillStyle = CSSProperties & { readonly "--fill": number };
