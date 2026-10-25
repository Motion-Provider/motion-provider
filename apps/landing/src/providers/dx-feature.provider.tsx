import { createContext, type ReactNode, use, useState } from "react";

import {
  dxComparedLibraryIds,
  dxComparison,
  dxComparisonIds,
} from "@/constants/dx-comparison.data";

export type DxComparisonItem = (typeof dxComparison)[number];
export type DxComparedItem = DxComparisonItem["comparedTo"][number];
export type DxComparisonID = DxComparisonItem["id"];
export type DxLibraryID = DxComparedItem["id"];

type DxComparisonContextValue = {
  comparisonId: DxComparisonID;
  libraryId: DxLibraryID;
  /** Comparison matching `comparisonId`. */
  active: DxComparisonItem;
  /** Compared library snippet matching `libraryId` within `active`. */
  activeCompared: DxComparedItem;
  setComparisonId: (id: DxComparisonID) => void;
  setLibraryId: (id: DxLibraryID) => void;
};

const DxComparisonContext = createContext<DxComparisonContextValue | null>(
  null,
);

const COMPARISON_BY_ID = new Map(
  dxComparison.map((item) => [item.id, item] as const),
);

function getFirst<T>(items: readonly T[], name: string): T {
  const [head] = items;

  if (head === undefined) {
    throw new Error(`dx-comparison: "${name}" dataset is empty`);
  }

  return head;
}

export function DxComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonId, setComparisonId] = useState<DxComparisonID>(() =>
    getFirst(dxComparisonIds, "comparison ids"),
  );
  const [libraryId, setLibraryId] = useState<DxLibraryID>(() =>
    getFirst(dxComparedLibraryIds, "library ids"),
  );

  const active =
    COMPARISON_BY_ID.get(comparisonId) ?? getFirst(dxComparison, "comparisons");
  const activeCompared =
    active.comparedTo.find((item) => item.id === libraryId) ??
    getFirst(active.comparedTo, "compared libraries");

  return (
    <DxComparisonContext
      value={{
        comparisonId,
        libraryId,
        active,
        activeCompared,
        setComparisonId,
        setLibraryId,
      }}
    >
      {children}
    </DxComparisonContext>
  );
}

export function useDxComparison(): DxComparisonContextValue {
  const context = use(DxComparisonContext);

  if (!context) {
    throw new Error(
      "useDxComparison must be used inside <DxComparisonProvider>",
    );
  }

  return context;
}
