import {
  findLayer,
  initialLayer,
  type LayerId,
  settingsOf,
} from "../lib/layers";
import { DEFAULT_VIEW_STATE, type ViewState } from "../schemas/playground";
import type {
  Assignments,
  Markup,
  MotionSettings,
  Project,
} from "../types/playground";

export type Dialog =
  | "import"
  | "export"
  | "saved"
  | "presets"
  | "shortcuts"
  | "resetAnimations";

export interface PlaygroundDocument {
  project: Project;
  markup: Markup;
}

export interface PlaygroundState extends ViewState, PlaygroundDocument {
  selected: LayerId | undefined;
  dialog: Dialog | undefined;
  replay: number;
  restored: boolean;
}

export type PlaygroundAction =
  | { type: "view"; patch: Partial<ViewState> }
  | { type: "select"; id: LayerId | undefined }
  | { type: "dialog"; dialog: Dialog | undefined }
  | { type: "load"; document: PlaygroundDocument }
  | {
      type: "restored";
      document?: PlaygroundDocument;
      layer?: string | null;
    }
  | { type: "patchSettings"; patch: Partial<MotionSettings> }
  | { type: "randomizeAll"; assignments: Assignments }
  | { type: "cancelReplay" }
  | { type: "resetAnimations" }
  | { type: "removeAnimation" };

export function createInitialState(
  initial: PlaygroundDocument,
): PlaygroundState {
  return {
    ...DEFAULT_VIEW_STATE,
    ...initial,
    selected: initialLayer(initial.markup, initial.project),
    dialog: undefined,
    replay: 0,
    restored: false,
  };
}

export function playgroundReducer(
  state: PlaygroundState,
  action: PlaygroundAction,
): PlaygroundState {
  switch (action.type) {
    case "view":
      return { ...state, ...action.patch };

    case "select":
      return { ...state, selected: action.id };

    case "dialog":
      return { ...state, dialog: action.dialog };

    case "load": {
      const { project, markup } = action.document;

      return {
        ...state,
        project,
        markup,
        selected: initialLayer(markup, project),
        view: "preview",
        before: false,
        dialog: undefined,
      };
    }

    case "restored": {
      if (!action.document) return { ...state, restored: true };

      const { project, markup } = action.document;

      return {
        ...state,
        project,
        markup,
        selected:
          markup.layers.find((layer) => layer.id === action.layer)?.id ??
          initialLayer(markup, project),
        restored: true,
      };
    }

    case "patchSettings": {
      const layer = findLayer(state.markup, state.selected);
      const current = settingsOf(layer, state.project);

      if (!layer || !current) return state;

      const replays = !state.before && state.view === "preview";

      return {
        ...state,
        replay: replays ? state.replay + 1 : state.replay,
        project: {
          ...state.project,
          assignments: {
            ...state.project.assignments,
            [layer.id]: { ...current, ...action.patch },
          },
        },
      };
    }

    case "randomizeAll":
      if (state.scope !== "batch") return state;

      return {
        ...state,
        replay:
          !state.before && state.view === "preview"
            ? state.replay + 1
            : state.replay,
        project: { ...state.project, assignments: action.assignments },
      };

    case "cancelReplay":
      return state.replay ? { ...state, replay: 0 } : state;

    case "resetAnimations":
      return {
        ...state,
        dialog: undefined,
        replay: 0,
        project: { ...state.project, assignments: {} },
      };

    case "removeAnimation": {
      const layer = findLayer(state.markup, state.selected);

      if (!layer) return state;

      const assignments = { ...state.project.assignments };
      delete assignments[layer.id];

      return { ...state, project: { ...state.project, assignments } };
    }
  }
}
