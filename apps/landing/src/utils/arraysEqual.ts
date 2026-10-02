export const arraysEqual = <T>(x: readonly T[], y: readonly T[]): boolean =>
  x.length === y.length && x.every((value, i) => value === y[i]);
