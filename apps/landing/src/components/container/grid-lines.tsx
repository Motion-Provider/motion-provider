import { cn } from "@/lib/utils";

export type GridAxis = "horizontal" | "vertical" | "both" | "diagonal";

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

  if (axis === "diagonal") {
    // Perpendicular spacing = size / √2 → horizontal spacing = size,
    // so the repeat divides the square tile exactly (no seams).
    const period = size * Math.SQRT1_2;

    gradients.push(
      `repeating-linear-gradient(
        315deg,
        currentColor 0,
        currentColor ${lineWidth}px,
        transparent ${lineWidth}px,
        transparent ${period}px
      )`,
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        "text-foreground/6.5",
        className,
      )}
      style={{
        opacity,
        backgroundImage: gradients.join(","),
        backgroundSize:
          axis === "horizontal"
            ? `100% ${size}px`
            : axis === "vertical"
              ? `${size}px 100%`
              : `${size}px ${size}px`,
      }}
    />
  );
}
