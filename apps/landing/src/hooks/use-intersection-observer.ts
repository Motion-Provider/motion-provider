import { useRef, useState } from "react";

export type UseIntersectionObserverOptions = IntersectionObserverInit;

export type UseIntersectionObserverReturn = readonly [
  ref: (node: Element | null) => void,
  entry: IntersectionObserverEntry | null,
];

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {
    rootMargin: "50% 0px",
    threshold: 0,
  },
): UseIntersectionObserverReturn {
  const { root = null, rootMargin, threshold } = options;
  const thresholdKey: string | number | undefined = Array.isArray(threshold)
    ? threshold.join(",")
    : threshold;

  const previousObserver = useRef<IntersectionObserver | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const ref = (node: Element | null): void => {
    if (previousObserver.current) {
      previousObserver.current.disconnect();
      previousObserver.current = null;
    }

    if (!node) return;

    const observer = new IntersectionObserver(
      ([nextEntry]) => {
        setEntry(nextEntry ?? null);
      },
      {
        root,
        rootMargin,
        threshold:
          thresholdKey === undefined
            ? undefined
            : String(thresholdKey).split(",").map(Number),
      },
    );

    observer.observe(node);
    previousObserver.current = observer;
  };

  return [ref, entry] as const;
}
