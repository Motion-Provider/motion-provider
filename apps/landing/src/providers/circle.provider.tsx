import type { AnimationController } from "motion-provider";
import { createContext, useContext } from "react";

export interface CircleContextProps {
  items: number;
  controller: AnimationController["getSnapshot"];
}
const CircleContext = createContext<AnimationController | null>(null);

function useCircle() {
  const ctx = useContext(CircleContext);
  if (!ctx) throw new Error("[useCircle]: No circle context");
  return ctx;
}

export { useCircle, useContext };
