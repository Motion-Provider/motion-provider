import { memo, type RefObject } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  useDxComparisonId,
  useDxLibraryId,
} from "@/providers/dx-feature.provider";
import {
  getComparedItem,
  getComparison,
  MOTION_PROVIDER,
} from "@/utils/comparison";
import { DxCodePane } from "./comparison-code";

export const DEFAULT_SPLIT_SIZE = 50;

/** Depends on both the comparison and the selected library. */
function DxComparedPane() {
  const comparisonId = useDxComparisonId();
  const libraryId = useDxLibraryId();
  const { code, label, icon } = getComparedItem(comparisonId, libraryId);

  return <DxCodePane code={code} label={label} icon={icon} />;
}

/** Depends on the comparison only, so switching library never touches it. */
function DxMotionProviderPane() {
  const comparisonId = useDxComparisonId();

  return (
    <DxCodePane
      code={getComparison(comparisonId).motionProviderCode}
      label={MOTION_PROVIDER.label}
      icon={MOTION_PROVIDER.icon}
    />
  );
}

export const DxComparisonPanel = memo(function DxComparisonPanel({
  sizeRef,
}: {
  sizeRef: RefObject<number>;
}) {
  return (
    <ResizablePanelGroup
      sizeRef={sizeRef}
      defaultSize={DEFAULT_SPLIT_SIZE}
      minSize={25}
      maxSize={75}
      className="flex-1 overflow-hidden rounded-3xl border border-border bg-(--syntax-bg)"
    >
      <ResizablePanel side="start">
        <DxComparedPane />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel side="end">
        <DxMotionProviderPane />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
});
