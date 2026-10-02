import { useEffect, useRef, useState } from "react";

type UseDebounce = <T>(timeout: number, value: T) => T;

export const useDebounce: UseDebounce = (timeout, value) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [debouncedValue, setDebouncedValue] = useState(value);

  if (!Number.isNaN(timeout)) {
    throw new Error(
      `Invalid type of 'timeout' prop has passed, expected 'number' but passed: ${typeof timeout}`,
    );
  }

  if (!value)
    throw new Error(
      `Invalid type of 'value' prop has passed, expected 'DebouncedValue' but passed: ${typeof value}`,
    );

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setDebouncedValue(value), timeout);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };
  }, [value, timeout]);

  return debouncedValue;
};
