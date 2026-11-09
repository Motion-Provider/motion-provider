import { useSyncExternalStore } from "react";

const query = "only screen and (max-width : 768px)";

export function useIsMobile() {
  const subscribe = (callback: () => void) => {
    const matchMedia = window.matchMedia(query);

    matchMedia.addEventListener("change", callback);

    return () => matchMedia.removeEventListener("change", callback);
  };

  const getSnapshot = () => window.matchMedia(query).matches;

  const getServerSnapshot = () => true;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
