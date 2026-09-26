import { cn } from "@/lib/utils";

export type ScalesOrientation = "horizontal" | "vertical" | "diagonal";

export interface ScalesProps {
  orientation?: ScalesOrientation;
  size?: number;
  lineWidth?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

const getGradientAngle = (orientation: ScalesOrientation): string => {
  switch (orientation) {
    case "horizontal":
      return "0deg";

    case "vertical":
      return "90deg";

    case "diagonal":
      return "315deg";
  }
};

export function Scales({
  orientation = "diagonal",
  size = 8,
  lineWidth = 1,
  color,
  opacity = 1,
  className,
}: ScalesProps) {
  const angle = getGradientAngle(orientation);

  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden",
        "[--pattern-scales:var(--color-neutral-950)]/10",
        "dark:[--pattern-scales:var(--color-white)]/10",
        className,
      )}
      style={
        {
          "--scales-size": `${size}px`,
          "--scales-line-width": `${lineWidth}px`,
          "--scales-angle": angle,
          ...(color && { "--pattern-scales": color }),
          opacity,
        } as React.CSSProperties
      }
    >
      <div
        className="h-full w-full bg-[repeating-linear-gradient(var(--scales-angle),var(--pattern-scales)_0,var(--pattern-scales)_var(--scales-line-width),transparent_0,transparent_50%)]"
        style={{
          backgroundSize: `var(--scales-size) var(--scales-size)`,
        }}
      />
    </div>
  );
}
