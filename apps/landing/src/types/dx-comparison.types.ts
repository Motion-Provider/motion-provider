import type { LucideIcon } from "lucide-react";
import type { MetricLibrary } from "./metrics.type";

export type DxComparisonID =
  | "in-view"
  | "scroll-based"
  | "enter-exit"
  | "chained";

export type DxComparedItem = {
  id: Exclude<MetricLibrary, "motion-provider">;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  label: string;
  code: string;
};

export type DxComparisonItem = {
  id: DxComparisonID;
  icon: LucideIcon;
  label: string;
  motionProviderCode: string;
  comparedTo: DxComparedItem[];
};
