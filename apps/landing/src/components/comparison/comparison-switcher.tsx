import { dxComparison } from "@/constants/dx-comparison.data";
import {
  useDxComparisonActions,
  useDxComparisonId,
} from "@/providers/dx-feature.provider";
import { DxComparisonButton } from "./comparison-button";

export function DxComparisonSwitcher() {
  const comparisonId = useDxComparisonId();
  const { setComparisonId } = useDxComparisonActions();

  return dxComparison.map((item) => (
    <DxComparisonButton
      key={item.id}
      id={item.id}
      icon={item.icon}
      label={item.label}
      isActive={item.id === comparisonId}
      onSelect={setComparisonId}
    />
  ));
}
