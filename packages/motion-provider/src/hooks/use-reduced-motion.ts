"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

const getSnapshot = () =>
	typeof window !== "undefined" && !!window.matchMedia?.(query).matches;

const getServerSnapshot = () => false;

const subscribe = (listener: () => void) => {
	const media =
		typeof window !== "undefined" ? window.matchMedia?.(query) : undefined;
	media?.addEventListener("change", listener);
	return () => media?.removeEventListener("change", listener);
};

/** Subscribe only to preference changes, with a deterministic server snapshot. */
export function useReducedMotion() {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
