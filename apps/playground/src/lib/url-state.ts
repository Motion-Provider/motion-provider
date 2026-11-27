import { DEFAULT_VIEW_STATE, type ViewState } from "../schemas/playground";

const VIEW_KEYS = ["view", "scope", "device"] as const;

export function setParam(
  params: URLSearchParams,
  key: string,
  value: string | undefined,
): void {
  if (value) params.set(key, value);
  else params.delete(key);
}

export function writeViewState(
  params: URLSearchParams,
  state: ViewState,
): void {
  params.delete("mode");
  for (const key of VIEW_KEYS)
    setParam(
      params,
      key,
      state[key] === DEFAULT_VIEW_STATE[key] ? undefined : state[key],
    );

  setParam(params, "compare", state.before ? "original" : undefined);
}
