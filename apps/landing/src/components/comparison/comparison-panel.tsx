import { type Attributes, memo, type RefObject } from "react";

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
import { DxCodePane, type DxCodePaneAnimation } from "./comparison-code";

export const DEFAULT_SPLIT_SIZE = 50;

/**
 * Animation props accepted by each pane. `animationMode` decides which
 * `animationProps` shape is allowed; omit both for a static pane.
 * `animationKey` is optional: each pane falls back to a key derived from the
 * active selection, so the animation replays whenever the code changes.
 */
type DxPaneAnimationProps = DxCodePaneAnimation & {
  animationKey?: Attributes["key"];
};

function DxComparedPane({ animationKey, ...animation }: DxPaneAnimationProps) {
  const comparisonId = useDxComparisonId();
  const libraryId = useDxLibraryId();

  const { code, label, icon } = getComparedItem(comparisonId, libraryId);

  return (
    <DxCodePane
      code={code}
      label={label}
      icon={icon}
      animationKey={animationKey ?? `${comparisonId}-${libraryId}`}
      {...animation}
    />
  );
}

function DxMotionProviderPane({
  animationKey,
  ...animation
}: DxPaneAnimationProps) {
  const comparisonId = useDxComparisonId();

  return (
    <DxCodePane
      code={getComparison(comparisonId).motionProviderCode}
      label={MOTION_PROVIDER.label}
      icon={MOTION_PROVIDER.icon}
      animationKey={animationKey ?? comparisonId}
      {...animation}
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
      maxSize={100}
      className="flex-1 overflow-hidden rounded-3xl border border-border bg-(--syntax-bg)"
    >
      <ResizablePanel side="start" className="scrollbar-none overflow-hidden">
        <DxMotionProviderPane
          animationMode="text"
          animationProps={{
            animation: {
              mode: ["filterBlurIn", "transformRevealRight"],
              transition: "gentle",
              duration: 0.44,
            },
            config: {
              mode: "chars",
              duration: 0.8,
            },
          }}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel side="end" className="scrollbar-none overflow-hidden">
        <DxComparedPane
          animationMode="chain"
          animationProps={{
            animation: {
              mode: ["fadeDown", "filterBlurIn"],
              transition: "gentle",
              duration: 1,
            },
            config: {
              delayLogic: "linear",
              duration: 0.15,
            },
          }}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
});
