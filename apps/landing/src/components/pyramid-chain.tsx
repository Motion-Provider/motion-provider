import { MotionChain, type MotionChainProps } from "motion-provider";
import type circleConfig from "@/constants/circle.config";
import type animationData from "@/constants/motion.data";
import { getAnimation } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CircleItem } from "./circle/circle-item";

type Identity = typeof circleConfig.identity;

type AnimationName = keyof typeof animationData;

interface Props extends Identity {
  beginRadius: number;
  endRadius: number;
  holeRadius: number;
  count: number;
  evenColor?: string;
  oddColor?: string;
  className?: string;
  withSvg?: boolean;
  animationName: AnimationName;
}

export function PyramidChain({
  beginRadius,
  endRadius,
  holeRadius,
  count,
  className,
  withSvg,
  animationName,
  ...identity
}: Props) {
  const items = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);

    return {
      radius: holeRadius + (beginRadius + t * (endRadius - beginRadius)),
      id: i + 1,
    };
  });

  const animation = getAnimation(animationName) as Omit<
    MotionChainProps,
    "children"
  >;

  const Wrapper: React.ElementType = withSvg ? "svg" : "g";
  return (
    <Wrapper
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none", className)}
    >
      <title className="sr-only">Pyramid Chain</title>
      <MotionChain {...animation}>
        {items.map(({ ...props }) => (
          <CircleItem key={props.id} {...identity} {...props} />
        ))}
      </MotionChain>
    </Wrapper>
  );
}
