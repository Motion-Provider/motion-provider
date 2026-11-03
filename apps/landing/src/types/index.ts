import type { Dispatch, SetStateAction } from "react";

export type SetStateProps<T> = Dispatch<SetStateAction<T>>;

export type NavigationItem = {
  label: string;
  href: string;
  external?: boolean;
};
