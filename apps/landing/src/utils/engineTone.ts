import type { CSSProperties } from "react";
import type { EngineTone } from "@/types/engine.type";

export type ToneStyle = CSSProperties & Record<`--${string}`, string>;

export const toneStyle = (tone: EngineTone): ToneStyle => ({
  "--tone": `var(--${tone})`,
});
