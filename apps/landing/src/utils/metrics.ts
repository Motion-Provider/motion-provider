import { MIN_FILL } from "@/constants/metrics.config";
import type {
  MetricFillStyle,
  MetricItem,
  MetricSizeKey,
} from "@/types/metrics.type";

export const getMaxValue = (
  items: readonly MetricItem[],
  key: MetricSizeKey,
): number => Math.max(...items.map((item) => item[key]));

export const getFillStyle = (value: number, max: number): MetricFillStyle => ({
  "--fill": max > 0 ? Math.max(value / max, MIN_FILL) : MIN_FILL,
});

export const heavierBy = (
  base: MetricItem,
  other: MetricItem,
  key: MetricSizeKey = "gzipBytes",
): string => `${(other[key] / base[key]).toFixed(1)}×`;
