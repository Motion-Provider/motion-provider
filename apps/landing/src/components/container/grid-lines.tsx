import * as React from "react";

import { cn } from "@/lib/utils";

export type GridAxis = "horizontal" | "vertical" | "both";

export interface GridLinesProps {
  axis?: GridAxis;
  size?: number;
  lineWidth?: number;
  opacity?: number;
  className?: string;
}

export function GridLines({
  axis = "horizontal",
  size = 96,
  lineWidth = 1,
  opacity = 1,
  className,
}: GridLinesProps) {
  const gradients: string[] = [];

  if (axis === "horizontal" || axis === "both") {
    gradients.push(
      `repeating-linear-gradient(
        to bottom,
        currentColor 0,
        currentColor ${lineWidth}px,
        transparent ${lineWidth}px,
        transparent ${size}px
      )`,
    );
  }

  if (axis === "vertical" || axis === "both") {
    gradients.push(
      `repeating-linear-gradient(
        to right,
        currentColor 0,
        currentColor ${lineWidth}px,
        transparent ${lineWidth}px,
        transparent ${size}px
      )`,
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        "text-foreground/[0.065]",
        className,
      )}
      style={{
        opacity,
        backgroundImage: gradients.join(","),
        backgroundSize:
          axis === "both"
            ? `${size}px ${size}px`
            : axis === "horizontal"
              ? `100% ${size}px`
              : `${size}px 100%`,
      }}
    />
  );
}
