import { type MotionAnimationProps, MotionChain } from "motion-provider";
import { cn } from "@/lib/utils";
import type { ShowcaseComponentProps } from "@/types/types-showcase";

// Layout: shapes scaled to ~80%, 8-unit gaps, content spans y = 18..82
// in a 100x100 viewBox (18-unit top/bottom margins), centered on x = 50.
const elements = [
  <circle key="circle" cx="50" cy="25" r="7" className="text-blue-500" />,
  <polygon
    key="polygon"
    points="50,40 60,58 40,58"
    className="text-emerald-500"
  />,
  <rect
    key="rect"
    x="42"
    y="66"
    width="16"
    height="16"
    className="text-accent"
  />,
];

const animations: MotionAnimationProps[] = elements.map((_, idx) => ({
  mode: idx % 2 === 0 ? "fadeRight" : "fadeLeft",
  transition: "bounceSoft",
}));

export default function MotionContainerDemo({
  className,
  controller,
}: ShowcaseComponentProps) {
  return (
    <div
      className={cn("flex size-full items-center justify-center", className)}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none size-full max-h-full max-w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        aria-label="Circle, triangle, and square"
        role="img"
      >
        <MotionChain
          animations={animations}
          config={{
            duration: 0.24,
          }}
          controller={controller}
          elementType="g"
        >
          {elements}
        </MotionChain>
      </svg>
    </div>
  );
}
