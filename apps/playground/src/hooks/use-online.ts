import { useSyncExternalStore } from "react";

function subscribe(notify: () => void): () => void {
  window.addEventListener("online", notify);
  window.addEventListener("offline", notify);

  return () => {
    window.removeEventListener("online", notify);
    window.removeEventListener("offline", notify);
  };
}

export function useOnline(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  );
}
