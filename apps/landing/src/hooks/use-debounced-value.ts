import { useEffect, useState } from "react";

type UseDebounce = <T>(timeout: number, value: T) => T;

export const useDebouncedValue: UseDebounce = (timeout, value) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  if (Number.isNaN(timeout)) {
    throw new Error(
      `Invalid type of 'timeout' prop has passed, expected 'number' but passed: ${typeof timeout}`,
    );
  }

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), timeout);
    return () => clearTimeout(id);
  }, [value, timeout]);

  return debouncedValue;
};
