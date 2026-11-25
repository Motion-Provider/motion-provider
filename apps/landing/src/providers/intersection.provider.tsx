import { useState } from "react";
import { cn } from "@/lib/utils";

const defaultOptions: IntersectionObserverInit = {
  rootMargin: "50% 0px",
  threshold: 0,
};

export default function IntersectionProvider({
  children,
  className,
  fallback,
  options = defaultOptions,
}: {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  options?: IntersectionObserverInit;
}) {
  const [hasIntersected, setHasIntersected] = useState(false);
  const { root = null, rootMargin, threshold } = options;
  const thresholdKey = Array.isArray(threshold)
    ? threshold.join(",")
    : threshold;

  function observe(node: HTMLDivElement | null) {
    if (!node) return;

    let observing = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!observing || !entries.some((entry) => entry.isIntersecting))
          return;
        disconnect();
        setHasIntersected(true);
      },
      {
        root,
        rootMargin,
        threshold:
          typeof thresholdKey === "string"
            ? thresholdKey.split(",").map(Number)
            : thresholdKey,
      },
    );
    observer.observe(node);

    function disconnect() {
      if (!observing) return;
      observing = false;
      observer.disconnect();
    }

    return disconnect;
  }

  return (
    <div
      ref={hasIntersected ? undefined : observe}
      className={cn("relative", className)}
    >
      {hasIntersected ? children : fallback}
    </div>
  );
}
