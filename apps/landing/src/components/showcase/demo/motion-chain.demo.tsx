import { type MotionAnimationProps, MotionChain } from "motion-provider";
import { cn } from "@/lib/utils";
import type { ShowcaseComponentProps } from "@/types/types-showcase";

const elements = [
  <circle key="circle" cx="50" cy="23" r="9" className="text-blue-500" />,
  <polygon
    key="polygon"
    points="50,38 62,59 38,59"
    className="text-emerald-500"
  />,
  <rect
    key="rect"
    x="40"
    y="68"
    width="20"
    height="20"
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
    <div className={cn("", className)}>
      <svg
        viewBox="0 0 100 300"
        className="size-full pointer-events-none mt-16"
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
          {elements.map((element) => element)}
        </MotionChain>
      </svg>
    </div>
  );
}
