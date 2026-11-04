import type { CSSProperties } from "react";
import type { EngineTone } from "@/types/engine.type";

export type ToneStyle = CSSProperties & Record<`--${string}`, string>;

/** Exposes a group's design token as `--tone` so descendants style with `var(--tone)`. */
export const toneStyle = (tone: EngineTone): ToneStyle => ({
  "--tone": `var(--${tone})`,
});
