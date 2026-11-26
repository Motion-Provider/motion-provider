"use client";

import { useEffect, useRef, useState } from "react";

type Styles = {
  key: string;
  css: string;
  status: "ready" | "loading" | "stale";
};

export function useUtilities(
  classes: string[],
  enabled: boolean,
  online: boolean,
): Styles {
  const cache = useRef(new Map<string, string>());
  const key = enabled && classes.length ? JSON.stringify(classes) : "";
  const [styles, setStyles] = useState<Styles>({
    key: "",
    css: "",
    status: "ready",
  });

  useEffect(() => {
    if (!key) return;
    const cached = cache.current.get(key);
    if (cached !== undefined) {
      setStyles({ key, css: cached, status: "ready" });
      return;
    }
    if (!online) {
      setStyles({ key, css: "", status: "stale" });
      return;
    }
    const controller = new AbortController();
    void fetch("/api/utilities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: key,
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to generate utilities.");
        return response.text();
      })
      .then((css) => {
        if (controller.signal.aborted) return;
        if (cache.current.size >= 10)
          cache.current.delete(cache.current.keys().next().value ?? "");
        cache.current.set(key, css);
        setStyles({ key, css, status: "ready" });
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setStyles({ key, css: "", status: "stale" });
      });
    return () => controller.abort();
  }, [key, online]);

  if (!key) return { key, css: "", status: "ready" };
  if (styles.key === key) return styles;
  return { key, css: "", status: online ? "loading" : "stale" };
}
