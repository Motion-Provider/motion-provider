import { useReplayOnEdit } from "@/hooks/use-playback-effects";
import {
  useDraftAutosave,
  useRestore,
  useUrlSync,
} from "@/hooks/use-playground-sync";

export function PlaygroundEffects(): null {
  useRestore();
  useDraftAutosave();
  useUrlSync();
  useReplayOnEdit();

  return null;
}
