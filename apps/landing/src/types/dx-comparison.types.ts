import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";
import type { MetricLibrary } from "./metrics.type";

export type DxComparisonID =
  | "in-view"
  | "scroll-based"
  | "enter-exit"
  | "chained";

export type DxComparedItem = {
  id: Exclude<MetricLibrary, "motion-provider">;
  icon: ComponentType<LucideIcon>;
  label: string;
  code: string;
};

export type DxComparisonItem = {
  id: DxComparisonID;
  icon: ComponentType<LucideIcon>;
  label: string;
  motionProviderCode: string;
  comparedTo: DxComparedItem[];
};
