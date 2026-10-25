import { dxComparison } from "@/constants/dx-comparison.data";
import { useDxComparison } from "@/providers/dx-feature.provider";
import { DxComparisonButton } from "./comparison-button";

export function DxComparisonSwitcher() {
  const { comparisonId, setComparisonId } = useDxComparison();

  return dxComparison.map((item) => (
    <DxComparisonButton
      key={item.id}
      icon={item.icon}
      label={item.label}
      isActive={item.id === comparisonId}
      onPress={() => setComparisonId(item.id)}
    />
  ));
}
