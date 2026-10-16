import type { MetricLibrary, MetricSizeKey } from "@/types/metrics.type";

export const LIBRARY_NAMES: Readonly<Record<MetricLibrary, string>> = {
  "motion-provider": "Motion Provider",
  motion: "Motion",
  gsap: "GSAP",
  animejs: "anime.js",
};

export const METRIC_SUFFIX: Readonly<Record<MetricSizeKey, string>> = {
  gzipBytes: "gzipped",
  minifiedBytes: "minified",
};

export const MIN_FILL = 0.02;
