import { createContext, useContext, useState } from "react";
import type { SetStateProps } from "@/types";
import type { ShowcaseSelected } from "@/types/types-showcase";

type ShowcaseContext = {
  selected: ShowcaseSelected;
  setSelected: SetStateProps<ShowcaseSelected>;
};

const ShowcaseContext = createContext<ShowcaseContext | undefined>(undefined);

export function useShowcase() {
  const ctx = useContext(ShowcaseContext);

  if (!ctx) {
    throw new Error(
      "useShowcaseContext must be used within a ShowcaseProvider",
    );
  }
  return ctx;
}

export function ShowcaseProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<ShowcaseSelected>(null);

  return (
    <ShowcaseContext value={{ selected, setSelected }}>
      {children}
    </ShowcaseContext>
  );
}
