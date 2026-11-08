import { createContext, type ReactNode, use, useState } from "react";

interface EngineLabelsContextValue {
  showLabels: boolean;
  setShowLabels: (show: boolean) => void;
}

const EngineLabelsContext = createContext<EngineLabelsContextValue | null>(
  null,
);

export function EngineLabelsProvider({ children }: { children: ReactNode }) {
  const [showLabels, setShowLabels] = useState(false);
  return (
    <EngineLabelsContext value={{ showLabels, setShowLabels }}>
      {children}
    </EngineLabelsContext>
  );
}

export function useEngineLabels(): EngineLabelsContextValue {
  const context = use(EngineLabelsContext);

  if (!context)
    throw new Error(
      "useEngineLabels must be used inside <EngineLabelsProvider>",
    );

  return context;
}
