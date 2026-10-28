import { MotionChain } from "motion-provider";
import { dxComparison } from "@/constants/dx-comparison.data";
import { getAnimation } from "@/lib/motion";
import {
  useDxComparisonActions,
  useDxComparisonId,
} from "@/providers/dx-feature.provider";
import { DxComparisonButton } from "./comparison-button";

const animation = getAnimation("dxComparisonSwitcher");

export function DxComparisonSwitcher({ className }: { className?: string }) {
  const comparisonId = useDxComparisonId();
  const { setComparisonId } = useDxComparisonActions();

  return (
    <MotionChain {...animation} className={className}>
      {dxComparison.map((item) => (
        <DxComparisonButton
          key={item.id}
          id={item.id}
          icon={item.icon}
          label={item.label}
          isActive={item.id === comparisonId}
          onSelect={setComparisonId}
        />
      ))}
    </MotionChain>
  );
}
