"use client";

import { useMemo } from "react";
import { prepareAnimation } from "../engine/animate.js";
import type { AnimationModule } from "../engine/types.js";
import { dataKey, parseData } from "../internal/stable.js";

export type PreparedDefinition = ReturnType<typeof prepareAnimation> & {
  key: string;
};

export function usePreparedAnimation(
  definition: AnimationModule,
): PreparedDefinition;
export function usePreparedAnimation(
  definition?: AnimationModule,
  shared?: PreparedDefinition,
): PreparedDefinition | undefined;
export function usePreparedAnimation(
  definition?: AnimationModule,
  shared?: PreparedDefinition,
): PreparedDefinition | undefined {
  const localKey = useMemo(
    () => (definition === undefined ? undefined : dataKey(definition)),
    [definition],
  );
  const key = shared?.key ?? localKey;
  // biome-ignore lint/correctness/useExhaustiveDependencies: The same definition key keeps playback stable when switching between shared and per-item preparation.
  return useMemo(
    () =>
      shared ??
      (key === undefined
        ? undefined
        : { ...prepareAnimation(parseData<AnimationModule>(key)), key }),
    [key],
  );
}
