import type { ThemedToken } from "@shikijs/core";
import type { CSSProperties } from "react";

const FONT_ITALIC = 1;
const FONT_BOLD = 2;
const FONT_UNDERLINE = 4;

export function getTokenStyle({
  color,
  fontStyle,
}: ThemedToken): CSSProperties {
  const style: CSSProperties = {};

  if (color) style.color = color;

  if (fontStyle !== undefined && fontStyle > 0) {
    if (fontStyle & FONT_ITALIC) style.fontStyle = "italic";
    if (fontStyle & FONT_BOLD) style.fontWeight = 700;
    if (fontStyle & FONT_UNDERLINE) style.textDecoration = "underline";
  }

  return style;
}
