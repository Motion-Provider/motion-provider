import { type AnimationController, MotionChain } from "motion-provider";
import { cn } from "@/lib/utils";
import config from "./config";

const { beginRadius, endRadius, holeRadius } = config;
const { cx, cy, rSub, strokeWidth } = config.identity;

function getCircleItems(jobsCount: number) {
  return Array.from({ length: jobsCount }, (_, i) => {
    const t = i / (jobsCount - 1);
    return holeRadius + (beginRadius + t * (endRadius - beginRadius));
  });
}

const items = getCircleItems(12).map((r) => r);

export function Circle({ controls }: { controls?: AnimationController }) {
  return (
    <div
      className="absolute size-lvw flex items-center-safe justify-center-safe pointer-events-none -z-10"
      style={{ perspective: "520px", perspectiveOrigin: "50% 60%" }}
    >
      <div className="relative size-full flex items-center-safe justify-center-safe transform-[rotateX(36deg)] transform-3d overflow-hidden">
        {
          // biome-ignore lint/a11y/noSvgWithoutTitle: dynamic svg
        } <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="size-full z-30"
        >
          <MotionChain
            animation={{
              mode: ["fadeUp"],
              transition: "bounceSoft",
              duration: 2.5,
            }}
            config={{
              duration: 0.24,
              delayLogic: "linear",
            }}
            controller={{
              ...controls,
              configView: {
                once: false,
                amount: 0.5,
              },
            }}
            elementType="g"
          >
            {items.map((radius, idx) => (
              <circle
                key={radius}
                cx={cx}
                cy={cy}
                r={radius - rSub}
                className={cn(
                  "z-30",
                  idx % 2 === 0 ? "text-accent/25" : "text-accent/50",
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
