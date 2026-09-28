import type { AnimationController, DelayLogic } from "motion-provider";
import { useController } from "motion-provider";
import {
  createContext,
  type RefObject,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { SetStateProps } from "@/types";

export interface ProgressStore {
  subscribe(listener: () => void): () => void;
  getSnapshot(): number;
  getServerSnapshot(): number;
}

function createProgressStore(
  svgRef: RefObject<SVGSVGElement | null>,
): ProgressStore {
  let progress = 0;
  let frame: number | null = null;
  const listeners = new Set<() => void>();

  const notify = () => {
    for (const listener of listeners) listener();
  };

  const read = (): number => {
    const sample = svgRef.current?.getAnimations({ subtree: true })[0];
    const timing = sample?.effect?.getComputedTiming();
    if (!timing) return progress;

    const iterations = Number.isFinite(timing.iterations)
      ? Number(timing.iterations)
      : 1;
    const total =
      Number(timing.delay ?? 0) +
      Number(timing.duration ?? 0) * iterations +
      Number(timing.endDelay ?? 0);

    if (!Number.isFinite(total) || total <= 0) return progress;

    const current = Number(sample?.currentTime ?? 0);
    return Math.max(0, Math.min(1, current / total));
  };

  const tick = () => {
    frame = null;
    const next = read();
    if (next !== progress) {
      progress = next;
      notify();
    }
    if (listeners.size) frame = requestAnimationFrame(tick);
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      if (frame === null) frame = requestAnimationFrame(tick);
      return () => {
        listeners.delete(listener);
        if (!listeners.size && frame !== null) {
          cancelAnimationFrame(frame);
          frame = null;
        }
      };
    },
    getSnapshot: () => progress,
    getServerSnapshot: () => 0,
  };
}

export interface CircleContextProps {
  itemsCount: number;
  controller: AnimationController;
  delayLogic: DelayLogic;
  progress: ProgressStore;
  svgRef: RefObject<SVGSVGElement | null>;
  setItemsCount: SetStateProps<number>;
  setDelayLogic: SetStateProps<DelayLogic>;
}

const CircleContext = createContext<CircleContextProps | undefined>(undefined);

function useCircle() {
  const ctx = useContext(CircleContext);
  if (!ctx) throw new Error("[useCircle]: No circle context");
  return ctx;
}

export function CircleProvider({ children }: { children: React.ReactNode }) {
  const [itemsCount, setItemsCount] = useState<number>(12);
  const [delayLogic, setDelayLogic] = useState<DelayLogic>("linear");

  const controller = useController();
  const svgRef = useRef<SVGSVGElement>(null);
  const progress = useMemo(() => createProgressStore(svgRef), []);

  return (
    <CircleContext.Provider
      value={{
        controller,
        delayLogic,
        itemsCount,
        progress,
        svgRef,
        setDelayLogic,
        setItemsCount,
      }}
    >
      {children}
    </CircleContext.Provider>
  );
}
export { useCircle, useContext };
