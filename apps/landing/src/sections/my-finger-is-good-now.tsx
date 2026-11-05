import { Chip } from "@heroui/react";
import { MotionChain, MotionText } from "motion-provider";
import { PyramidChain } from "@/components/pyramid-chain";
import config from "@/constants/circle.config";
import { getAnimation } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { beginRadius, endRadius, holeRadius } = config;

const keywords = ["fadeDown", "fadeUp", "maskGradientPerforate"] as const;

const textAnimation1 = getAnimation("myFingerIsGoodNowText1");
const textAnimation2 = getAnimation("myFingerIsGoodNowText2");

export default function MyFingerIsGoodNow() {
  return (
    <section className="min-h-60 w-full justify-center items-center flex bg-white text-black py-24 relative">
      <div className="w-7xl flex justify-between items-center z-10">
        <div className="text-6xl text-start tracking-tighter font-bold -mt-4">
          <ChipList className="tracking-normal pb-2" />
          <MotionText {...textAnimation1}>Simple yet powerful,</MotionText>
          <br />
          <MotionText {...textAnimation2}>Animation Provider.</MotionText>
        </div>
        <div className="pr-12 relative">
          <PyramidChain
            withSvg
            {...config.identity}
            className="z-30 desktop:size-96 laptop:size-80"
            animationName="myFingerIsGoodNowPyramid"
            evenColor="text-accent-foreground"
            oddColor="text-accent"
            beginRadius={beginRadius}
            endRadius={endRadius}
            holeRadius={holeRadius}
            count={8}
            strokeWidth={0.8}
          />
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
