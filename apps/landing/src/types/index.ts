import type { Dispatch, SetStateAction } from "react";

export type SetStateProps<T> = Dispatch<SetStateAction<T>>;
