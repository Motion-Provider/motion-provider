import { useEffect } from "react";
import { usePlayground } from "../context/playground";
import { usePlaygroundRuntime } from "../context/playground-runtime";

const REPLAY_DELAY_MS = 160;

export function useReplayOnEdit(): void {
  const {
    state: { replay, before, view },
  } = usePlayground();
  const {
    playback: { play },
  } = usePlaygroundRuntime();

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    if (replay === 0 || before || view !== "preview") return;

    const timer = window.setTimeout(() => play(true), REPLAY_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [replay]);
}
