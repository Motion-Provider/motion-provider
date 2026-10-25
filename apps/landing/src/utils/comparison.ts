import type { Key } from "react";

import {
  dxComparedLibraryIds,
  dxComparison,
  dxComparisonIds,
} from "@/constants/dx-comparison.data";

export type DxComparisonItem = (typeof dxComparison)[number];
export type DxComparedItem = DxComparisonItem["comparedTo"][number];
export type DxComparisonID = DxComparisonItem["id"];
export type DxLibraryID = DxComparedItem["id"];
export type DxLibrary = Pick<DxComparedItem, "id" | "label" | "icon">;

function getFirst<T>(items: readonly T[], name: string): T {
  const [head] = items;

  if (head === undefined) {
    throw new Error(`dx-comparison: "${name}" dataset is empty`);
  }

  return head;
}

const COMPARISON_BY_ID = new Map(
  dxComparison.map((item) => [item.id, item] as const),
);

const LIBRARY_BY_ID = new Map<DxLibraryID, DxLibrary>();

for (const { id, label, icon } of dxComparison.flatMap(
  (item) => item.comparedTo,
)) {
  if (!LIBRARY_BY_ID.has(id)) LIBRARY_BY_ID.set(id, { id, label, icon });
}

export const DEFAULT_COMPARISON_ID: DxComparisonID = getFirst(
  dxComparisonIds,
  "comparison ids",
);

export const DEFAULT_LIBRARY_ID: DxLibraryID = getFirst(
  dxComparedLibraryIds,
  "library ids",
);

export const DX_LIBRARIES: readonly DxLibrary[] = Array.from(
  LIBRARY_BY_ID.values(),
);

export const MOTION_PROVIDER = {
  label: "Motion Provider",
  icon: (LIBRARY_BY_ID.get("animejs") ?? getFirst(DX_LIBRARIES, "libraries"))
    .icon,
} as const;

export function getComparison(id: DxComparisonID): DxComparisonItem {
  return COMPARISON_BY_ID.get(id) ?? getFirst(dxComparison, "comparisons");
}

export function getComparedItem(
  comparisonId: DxComparisonID,
  libraryId: DxLibraryID,
): DxComparedItem {
  const { comparedTo } = getComparison(comparisonId);

  return (
    comparedTo.find((item) => item.id === libraryId) ??
    getFirst(comparedTo, "compared libraries")
  );
}

export function isLibraryId(key: Key): key is DxLibraryID {
  return dxComparedLibraryIds.some((id) => id === key);
}
