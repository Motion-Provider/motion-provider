import { Tabs } from "@heroui/react";
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

/** Static: reads no context, so it renders once. */
const DxLibraryTabList = memo(function DxLibraryTabList() {
  return (
    <Tabs.ListContainer>
      <Tabs.List aria-label="Compared libraries">
        {DX_LIBRARIES.map(({ id, icon: Icon, label }) => (
          <Tabs.Tab key={id} id={id}>
            <Icon aria-hidden="true" className="size-4" />
            {label}
            <Tabs.Indicator />
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs.ListContainer>
  );
});

export function DxComparisonSplit() {
  const libraryId = useDxLibraryId();
  const { setLibraryId } = useDxComparisonActions();
  const sizeRef = useRef(DEFAULT_SPLIT_SIZE);

  return (
    <Tabs
      className="flex size-full min-h-0 min-w-0 flex-col p-6"
      variant="secondary"
      selectedKey={libraryId}
      onSelectionChange={(key) => {
        if (isLibraryId(key)) setLibraryId(key);
      }}
    >
      <DxLibraryTabList />
      <Tabs.Panel id={libraryId} className="flex min-h-0 flex-1 flex-col pt-4">
        <DxComparisonPanel sizeRef={sizeRef} />
      </Tabs.Panel>
    </Tabs>
  );
}
