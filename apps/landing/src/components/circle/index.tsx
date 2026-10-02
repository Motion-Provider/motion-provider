import { type MotionAnimationProps, MotionChain } from "motion-provider";
import { useMemo } from "react";
import { useCircle } from "@/providers/circle.provider";
import config from "../../constants/circle.config";
import { CircleItem } from "./circle-item";

const { beginRadius, endRadius, holeRadius, count } = config;
const {
  duration: animationDuration,
  staggerDuration: animationStaggerDuration,
} = config.animation;

const items = Array.from({ length: count }, (_, i) => {
  const t = i / (count - 1);

  return {
    radius: holeRadius + (beginRadius + t * (endRadius - beginRadius)),
    id: i + 1,
  };
});

export function Circle() {
  const { controller, svgRef, animations, transition } = useCircle();

  const animationConfig: readonly MotionAnimationProps[] = useMemo(() => {
    return items.map((_, i) => ({
      mode: animations,
      transition: transition,
      duration: animationDuration,
      endDelay: (count - 1 - i) * animationStaggerDuration,
    }));
  }, [animations, transition]);

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
            animations={animationConfig}
            config={{
              duration: animationStaggerDuration,
              delayLogic: "linear",
            }}
            controller={controller}
            elementType="g"
            key={animations.join(",")}
          >
            {items.map(({ ...props }) => (
              <CircleItem key={props.id} {...props} />
            ))}
          </MotionChain>
        </svg>
      </div>
    </div>
  );
}
