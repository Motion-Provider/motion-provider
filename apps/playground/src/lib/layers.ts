import { settingsFor } from "../constants/motion.config";
import type {
  Markup,
  MotionSettings,
  Project,
  Scope,
} from "../types/playground";
import { animationTime } from "./motion";

export type Layer = Markup["layers"][number];
export type LayerId = Layer["id"];

export function findLayer(
  markup: Markup,
  id: LayerId | undefined,
): Layer | undefined {
  return markup.layers.find((layer) => layer.id === id);
}

export function initialLayer(
  markup: Markup,
  project: Project,
): LayerId | undefined {
  const assigned = markup.layers.filter(
    (layer) => project.assignments[layer.id],
  );

  return (
    assigned.find((layer) => layer.kind !== "MotionImage") ??
    assigned[0] ??
    markup.layers.find((layer) => layer.kind !== "MotionContainer") ??
    markup.layers[0]
  )?.id;
}

export function settingsOf(
  layer: Layer | undefined,
  project: Project,
): MotionSettings | undefined {
  return layer
    ? (project.assignments[layer.id] ?? settingsFor(layer.kind))
    : undefined;
}

export function activeLayerIds(
  assignments: Project["assignments"],
  selected: LayerId | undefined,
  scope: Scope,
): Set<string> {
  if (scope === "batch") return new Set(Object.keys(assignments));

  return new Set<string>(selected && assignments[selected] ? [selected] : []);
}

export function totalDuration(
  markup: Markup,
  assignments: Project["assignments"],
  active: ReadonlySet<string>,
): number {
  return markup.layers.reduce((longest, layer) => {
    const settings = assignments[layer.id];

    return settings && active.has(layer.id)
      ? Math.max(longest, animationTime(layer, settings, markup))
      : longest;
  }, 0);
}
