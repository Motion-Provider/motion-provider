import { useSyncExternalStore } from "react";

const query = "only screen and (max-width : 768px)";
let mediaQuery: MediaQueryList | undefined;

function getMediaQuery() {
  mediaQuery ??= window.matchMedia(query);
  return mediaQuery;
}

function subscribe(callback: () => void) {
  const media = getMediaQuery();
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSnapshot() {
  return getMediaQuery().matches;
}

function getServerSnapshot() {
  return true;
}

export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
