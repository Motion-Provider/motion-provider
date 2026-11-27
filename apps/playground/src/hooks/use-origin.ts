import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useOrigin(): string {
  return useSyncExternalStore(
    subscribe,
    () => window.location.origin,
    () => "",
  );
}
