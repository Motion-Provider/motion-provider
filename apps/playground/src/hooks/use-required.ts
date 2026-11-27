import { type Context, useContext } from "react";

export function useRequiredContext<T>(
  context: Context<T | null>,
  hookName: string,
): T {
  const value = useContext(context);

  if (value === null)
    throw new Error(`${hookName} must be used inside its provider.`);

  return value;
}
