import { Chip } from "@heroui/react";
import { MotionChain, MotionText } from "motion-provider";
import { CircleItem } from "@/components/circle/circle-item";
import config from "@/constants/circle.config";
import { getAnimation } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { beginRadius, endRadius, holeRadius } = config;

const count = 8;

const items = Array.from({ length: count }, (_, i) => {
  const t = i / (count - 1);

  return {
    radius: holeRadius + (beginRadius + t * (endRadius - beginRadius)),
    id: i + 1,
  };
});

const keywords = ["fadeDown", "fadeUp", "maskGradientPerforate"] as const;

const textAnimation1 = getAnimation("myFingerIsGoodNowText1");
const textAnimation2 = getAnimation("myFingerIsGoodNowText2");
const chainAnimation = getAnimation("myFingerIsGoodNowChain");

export default function MyFingerIsGoodNow() {
  return (
    <section className="min-h-60 w-full justify-center items-center flex bg-white text-black py-24">
      <div className="w-7xl flex justify-between items-center">
        <div className="text-6xl text-start tracking-tighter font-bold ">
          <MotionText {...textAnimation1}>Simple yet powerful,</MotionText>
          <br />
          <MotionText {...textAnimation2}>Animation Provider.</MotionText>
          <ChipList className="pt-6 tracking-normal" />
        </div>
        <div className="pr-12 relative">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="z-30 pointer-events-none desktop:size-96 laptop:size-80"
          >
            <title>My finger is good now</title>
            <MotionChain {...chainAnimation}>
              {items.map(({ ...props }) => (
                <g key={props.id}>
                  <CircleItem
                    evenColor="text-accent-foreground"
                    oddColor="text-accent"
                    {...config.identity}
                    {...props}
                    strokeWidth={0.8}
                  />
                </g>
              ))}
            </MotionChain>
          </svg>
        </div>
      </div>
    </section>
  );
}

const chipAnimation = getAnimation("myFingerIsGoodNowChip");

const ChipList = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex gap-1", className)}>
      <MotionChain {...chipAnimation}>
        {keywords.map((k) => (
          <Chip variant="soft" color="accent" key={k}>
            {k}
          </Chip>
        ))}
      </MotionChain>
    </div>
  );
};
