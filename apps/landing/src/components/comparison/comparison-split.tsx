import { type Key, Tabs } from "@heroui/react";
import { memo, useRef } from "react";
import {
  DEFAULT_SPLIT_SIZE,
  DxComparisonPanel,
} from "@/components/comparison/comparison-panel";
import {
  useDxComparisonActions,
  useDxLibraryId,
} from "@/providers/dx-feature.provider";
import { DX_LIBRARIES, isLibraryId } from "@/utils/comparison";

const DxLibraryTabList = memo(function DxLibraryTabList() {
  return (
    <Tabs.ListContainer className="bg-transparent">
      <Tabs.List aria-label="Compared libraries">
        {DX_LIBRARIES.map(({ id, icon: Icon, label }, idx) => (
          <Tabs.Tab key={id} id={id} className="flex gap-2">
            {idx !== 0 && <Tabs.Separator />}
            <Icon aria-hidden="true" className="size-5" />
            {label}
            <Tabs.Indicator className=" bg-surface/50" />
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs.ListContainer>
  );
});

export function DxComparisonSplit() {
  const sizeRef = useRef(DEFAULT_SPLIT_SIZE);

  const libraryId = useDxLibraryId();
  const { setLibraryId } = useDxComparisonActions();

  const handleSelectionChange = (key: Key) =>
    isLibraryId(key) && setLibraryId(key);

  return (
    <Tabs
      className="flex size-full min-h-0 min-w-0 flex-col p-6"
      variant="primary"
      selectedKey={libraryId}
      onSelectionChange={handleSelectionChange}
    >
      <DxLibraryTabList />
      <Tabs.Panel id={libraryId} className="flex min-h-0 flex-1 flex-col pt-4">
        <DxComparisonPanel sizeRef={sizeRef} />
      </Tabs.Panel>
    </Tabs>
  );
}
