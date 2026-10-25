import { Tabs } from "@heroui/react";
import { type Key, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { dxComparedLibraryIds } from "@/constants/dx-comparison.data";
import {
  type DxLibraryID,
  useDxComparison,
} from "@/providers/dx-feature.provider";
import { DxCodePane } from "./comparison-code";

const MOTION_PROVIDER_LABEL = "Motion Provider";

function isLibraryId(key: Key): key is DxLibraryID {
  return dxComparedLibraryIds.some((id) => id === key);
}

export function DxComparisonSplit() {
  const { active, activeCompared, libraryId, setLibraryId } = useDxComparison();
  const [splitSize, setSplitSize] = useState(50);

  // Placeholder: reuses the animejs mark until the Motion Provider logo is available.
  const motionProviderIcon =
    active.comparedTo.find((item) => item.id === "animejs")?.icon ??
    activeCompared.icon;

  return (
    <Tabs
      className="flex size-full min-h-0 min-w-0 flex-col p-6"
      variant="secondary"
      selectedKey={libraryId}
      onSelectionChange={(key) => {
        if (isLibraryId(key)) setLibraryId(key);
      }}
    >
      <Tabs.ListContainer>
        <Tabs.List aria-label="Compared libraries">
          {active.comparedTo.map(({ id, icon: Icon, label }) => (
            <Tabs.Tab key={id} id={id}>
              <Icon aria-hidden="true" className="size-4" />
              {label}
              <Tabs.Indicator />
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel id={libraryId} className="flex min-h-0 flex-1 flex-col pt-4">
        <ResizablePanelGroup
          size={splitSize}
          onSizeChange={setSplitSize}
          minSize={25}
          maxSize={75}
          className="flex-1 overflow-hidden rounded-3xl border border-border bg-(--syntax-bg)"
        >
          <ResizablePanel side="start">
            <DxCodePane
              code={active.motionProviderCode}
              label={MOTION_PROVIDER_LABEL}
              icon={motionProviderIcon}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel side="end">
            <DxCodePane
              code={activeCompared.code}
              label={activeCompared.label}
              icon={activeCompared.icon}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </Tabs.Panel>
    </Tabs>
  );
}
