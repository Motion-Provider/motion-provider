import { type MotionAnimationProps, MotionChain } from "motion-provider";
import { cn } from "@/lib/utils";
import { useCircle } from "@/providers/circle.provider";
import config from "./config";

const { beginRadius, endRadius, holeRadius } = config;
const { cx, cy, rSub, strokeWidth } = config.identity;

const COUNT = 12;
const STAGGER_S = 0.24;
const FADE_S = 2.5;

function getTriangleItems(jobsCount: number) {
  return Array.from({ length: jobsCount }, (_, i) => {
    const t = i / (jobsCount - 1);

    return {
      radius: holeRadius + (beginRadius + t * (endRadius - beginRadius)),
      id: i + 1,
    };
  });
}

function getTrianglePoints(cx: number, cy: number, radius: number) {
  return Array.from({ length: 3 }, (_, i) => {
    const angle = ((i * 120 - 90) * Math.PI) / 180;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");
}

const items = getTriangleItems(COUNT);

const animations: readonly MotionAnimationProps[] = items.map((_, i) => ({
  mode: ["fadeDown", "rotateFlipX"],
  transition: "bounceSoft",
  duration: FADE_S,
  endDelay: (COUNT - 1 - i) * STAGGER_S,
}));

export function Circle() {
  const { controller, svgRef } = useCircle();

  return (
    <div
      className="absolute size-full pointer-events-none -mt-36"
      style={{ perspective: "520px", perspectiveOrigin: "50% 60%" }}
    >
      <div className="relative size-full flex items-center-safe justify-center-safe transform-[rotateX(40deg)] transform-3d">
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: dynamic svg */}
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="size-full z-30 pointer-events-none"
        >
          <MotionChain
            animations={animations}
            config={{ duration: STAGGER_S, delayLogic: "linear" }}
            controller={controller}
            elementType="g"
          >
            {items.map(({ radius, id }) => (
              <polygon
                key={id}
                points={getTrianglePoints(cx, cy, radius - rSub)}
                className={cn(
                  "z-30",
                  id % 2 === 0 ? "text-accent/25" : "text-accent/50",
                )}
                stroke="currentColor"
                fill="none"
                strokeWidth={strokeWidth}
              />
            ))}
          </MotionChain>
        </svg>
      </div>
    </div>
  );
}
