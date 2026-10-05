import { useEffect, useEffectEvent, useRef } from "react";

type Dep = string | number | boolean | null | undefined;
type ArrayDeps = ReadonlyArray<Dep>;

type UseDebouncedFn = (
  timeout: number,
  fn: () => void,
  deps: ArrayDeps,
) => void;

export const useDebouncedFn: UseDebouncedFn = (timeout, fn, deps) => {
  const previousDepsRef = useRef<ArrayDeps>(deps);
  const onFire = useEffectEvent(fn);

  // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
  useEffect(() => {
    const previous = previousDepsRef.current;
    previousDepsRef.current = deps;

    const hasChanged =
      previous.length !== deps.length ||
      deps.some((dep, index) => !Object.is(dep, previous[index]));

    if (!hasChanged) return;

    const timeoutId = setTimeout(onFire, timeout);
    return () => clearTimeout(timeoutId);
  }, [...deps]);
};
