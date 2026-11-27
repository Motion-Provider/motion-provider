import { createContext, type ReactNode, useMemo, useReducer } from "react";
import { useRequiredContext } from "@/hooks/use-required";
import { findLayer, type Layer, type LayerId, settingsOf } from "../lib/layers";
import type { ViewState } from "../schemas/playground";
import type { Markup, MotionSettings, Project } from "../types/playground";
import { useReport } from "./notice";
import {
  createInitialState,
  type Dialog,
  type PlaygroundDocument,
  type PlaygroundState,
  playgroundReducer,
} from "./playground-reducer";

export interface PlaygroundActions {
  patchView: (patch: Partial<ViewState>) => void;
  select: (id: LayerId | undefined) => void;
  openDialog: (dialog: Dialog) => void;
  closeDialog: () => void;
  load: (document: PlaygroundDocument) => void;
  restore: (document?: PlaygroundDocument, layer?: string | null) => void;
  patchSettings: (patch: Partial<MotionSettings>) => void;
  removeAnimation: () => void;
}

interface PlaygroundContextValue {
  state: PlaygroundState;
  initial: PlaygroundDocument;
  layer: Layer | undefined;
  settings: MotionSettings | undefined;
  actions: PlaygroundActions;
}

interface PlaygroundProviderProps {
  starter: Project;
  initialMarkup: Markup;
  children: ReactNode;
}

const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

export function PlaygroundProvider({
  starter,
  initialMarkup,
  children,
}: PlaygroundProviderProps) {
  const report = useReport();

  const initial = useMemo<PlaygroundDocument>(
    () => ({ project: starter, markup: initialMarkup }),
    [starter, initialMarkup],
  );
  const [state, dispatch] = useReducer(
    playgroundReducer,
    initial,
    createInitialState,
  );

  const actions = useMemo<PlaygroundActions>(
    () => ({
      patchView: (patch) => dispatch({ type: "view", patch }),
      select: (id) => dispatch({ type: "select", id }),
      openDialog: (dialog) => dispatch({ type: "dialog", dialog }),
      closeDialog: () => dispatch({ type: "dialog", dialog: undefined }),
      load: (document) => dispatch({ type: "load", document }),
      restore: (document, layer) =>
        dispatch({ type: "restored", document, layer }),
      patchSettings: (patch) => dispatch({ type: "patchSettings", patch }),
      removeAnimation: () => {
        dispatch({ type: "removeAnimation" });
        report("Animation removed.");
      },
    }),
    [report],
  );

  const layer = useMemo(
    () => findLayer(state.markup, state.selected),
    [state.markup, state.selected],
  );
  const settings = useMemo(
    () => settingsOf(layer, state.project),
    [layer, state.project],
  );

  const value = useMemo(
    () => ({ state, initial, layer, settings, actions }),
    [state, initial, layer, settings, actions],
  );

  return (
    <PlaygroundContext.Provider value={value}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground(): PlaygroundContextValue {
  return useRequiredContext(PlaygroundContext, "usePlayground");
}
