import { createContext, type ReactNode, useReducer } from "react";
import { useRequiredContext } from "@/hooks/use-required";
import { report } from "@/lib/report";
import { findLayer, type Layer, type LayerId, settingsOf } from "../lib/layers";
import type { ViewState } from "../schemas/playground";
import type { Markup, MotionSettings, Project } from "../types/playground";
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
  cancelReplay: () => void;
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
  const initial = { project: starter, markup: initialMarkup };
  const [state, dispatch] = useReducer(
    playgroundReducer,
    initial,
    createInitialState,
  );

  const actions: PlaygroundActions = {
    patchView: (patch) => dispatch({ type: "view", patch }),
    select: (id) => dispatch({ type: "select", id }),
    openDialog: (dialog) => dispatch({ type: "dialog", dialog }),
    closeDialog: () => dispatch({ type: "dialog", dialog: undefined }),
    load: (document) => dispatch({ type: "load", document }),
    restore: (document, layer) =>
      dispatch({ type: "restored", document, layer }),
    patchSettings: (patch) => dispatch({ type: "patchSettings", patch }),
    cancelReplay: () => dispatch({ type: "cancelReplay" }),
    removeAnimation: () => {
      dispatch({ type: "removeAnimation" });
      report("Animation removed.");
    },
  };

  const layer = findLayer(state.markup, state.selected);
  const settings = settingsOf(layer, state.project);

  const value = { state, initial, layer, settings, actions };

  return (
    <PlaygroundContext.Provider value={value}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground(): PlaygroundContextValue {
  return useRequiredContext(PlaygroundContext, "usePlayground");
}
