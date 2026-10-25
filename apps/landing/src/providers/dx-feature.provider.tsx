import { createContext, type ReactNode, use, useMemo, useState } from "react";

import {
  DEFAULT_COMPARISON_ID,
  DEFAULT_LIBRARY_ID,
  type DxComparisonID,
  type DxLibraryID,
} from "@/utils/comparison";

/**
 * Three independent contexts, so a consumer re-renders only for the slice it reads:
 * - comparison id (switcher buttons, comparison-dependent panes)
 * - library id    (tabs, compared pane)
 * - actions       (stable, never triggers a re-render)
 */
type DxComparisonActions = {
  setComparisonId: (id: DxComparisonID) => void;
  setLibraryId: (id: DxLibraryID) => void;
};

const DxComparisonIdContext = createContext<DxComparisonID | null>(null);
const DxLibraryIdContext = createContext<DxLibraryID | null>(null);
const DxComparisonActionsContext = createContext<DxComparisonActions | null>(
  null,
);

export function DxComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonId, setComparisonId] = useState<DxComparisonID>(
    DEFAULT_COMPARISON_ID,
  );
  const [libraryId, setLibraryId] = useState<DxLibraryID>(DEFAULT_LIBRARY_ID);

  const actions = useMemo<DxComparisonActions>(
    () => ({ setComparisonId, setLibraryId }),
    [],
  );

  return (
    <DxComparisonActionsContext value={actions}>
      <DxComparisonIdContext value={comparisonId}>
        <DxLibraryIdContext value={libraryId}>{children}</DxLibraryIdContext>
      </DxComparisonIdContext>
    </DxComparisonActionsContext>
  );
}

function useRequired<T>(value: T | null, hookName: string): T {
  if (value === null) {
    throw new Error(`${hookName} must be used inside <DxComparisonProvider>`);
  }

  return value;
}

export function useDxComparisonId(): DxComparisonID {
  return useRequired(use(DxComparisonIdContext), "useDxComparisonId");
}

export function useDxLibraryId(): DxLibraryID {
  return useRequired(use(DxLibraryIdContext), "useDxLibraryId");
}

export function useDxComparisonActions(): DxComparisonActions {
  return useRequired(use(DxComparisonActionsContext), "useDxComparisonActions");
}
