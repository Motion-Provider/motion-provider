"use client";

import { useEffect, useRef } from "react";

/** Update after commit so abandoned concurrent renders cannot replace active callbacks. */
export function useLatest<T>(value: T) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}
