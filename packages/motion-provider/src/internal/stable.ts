/** Stable JSON identity for immutable data props; functions/DOM objects stay outside this key. */
export function dataKey(value: unknown): string {
  return JSON.stringify(value, (_key, item) => {
    if (item === Infinity)
      return {
        __motionInfinity: true,
      };
    if (item && typeof item === "object" && !Array.isArray(item))
      return Object.fromEntries(
        Object.keys(item)
          .sort()
          .map((key) => [key, item[key]]),
      );
    return item;
  });
}

export function parseData<T>(key: string): T {
  return JSON.parse(key, (_key, item) =>
    item?.__motionInfinity === true ? Infinity : item,
  ) as T;
}
