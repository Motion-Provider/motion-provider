import { useEffect } from "react";
import { usePlayground } from "../context/playground";
import { usePlaygroundRuntime } from "../context/playground-runtime";

const REPLAY_DELAY_MS = 160;
const INTERACTIVE_SELECTOR =
  "input, textarea, select, button, a, [contenteditable], [role=slider]";

export function usePlayHotkey(): void {
  const {
    state: { dialog, view, before },
  } = usePlayground();
  const { total, playback } = usePlaygroundRuntime();
  const { play, pause } = playback;
  const playing = playback.display.state === "playing";
  const enabled = !dialog && view === "preview" && !before && total > 0;

  useEffect(() => {
    if (!enabled) return;

    const onKey = (event: KeyboardEvent) => {
      if (
        event.code !== "Space" ||
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (event.target instanceof Element &&
          event.target.closest(`${INTERACTIVE_SELECTOR}, [role=dialog]`))
      )
        return;

      event.preventDefault();
      if (playing) pause();
      else play();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, pause, play, playing]);
}

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
