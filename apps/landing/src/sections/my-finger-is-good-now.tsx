import { Chip } from "@heroui/react";
import { MotionText } from "motion-provider";
import Marquee from "@/components/marquee";
import { PyramidChain } from "@/components/pyramid-chain";
import config from "@/constants/circle.config";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { getAnimation } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { beginRadius, endRadius, holeRadius } = config;

const keywords = [
  "clipCircle",
  "clipDown",
  "clipPop",
  "clipUp",
  "colorShift",
  "default",
  "translate3dOut",
  "translate3dRotate",
  "translate3dZoom",
  "typingEffect",
];

const textAnimation1 = getAnimation("myFingerIsGoodNowText1");
const textAnimation2 = getAnimation("myFingerIsGoodNowText2");

export default function MyFingerIsGoodNow() {
  return (
    <section className="min-h-60 w-full justify-center items-center flex bg-[#2a1610] text-foreground py-24 relative">
      <div className="absolute top-0 h-24 w-full bg-linear-to-b from-background to-[#2a1610]" />
      <div className="absolute bottom-0 h-24 w-full bg-linear-to-b from-[#2a1610] to-background" />
      <div className="w-7xl flex md:flex-row flex-col justify-between items-center z-10">
        <div className="md:text-6xl text-5xl md:text-start text-center tracking-tighter font-bold -mt-4 items-center">
          <ChipList className="tracking-normal md:pb-4 pb-6 md:justify-start items-center md:max-w-lg max-w-xs overflow-hidden rounded-2xl" />
          <MotionText {...textAnimation1}>Simple Yet Powerful,</MotionText>
          <br />
          <MotionText {...textAnimation2}>Animation Provider.</MotionText>
        </div>
        <div className="md:pr-12 relative">
          <PyramidChain
            withSvg
            {...config.identity}
            className="z-30 desktop:size-96 laptop:size-80 size-60 md:mt-0 mt-8"
            animationName="myFingerIsGoodNowPyramid"
            evenColor="text-accent/50"
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

const ChipList = ({ className }: { className?: string }) => {
  const isMobile = useIsMobile();
  const Wrapper = isMobile ? "center" : "div";
  return (
    <Wrapper>
      <Marquee className={cn("flex gap-1", className)} repeat={4}>
        {keywords.map((k) => (
          <Chip variant="soft" color="accent" key={k}>
            {k}
          </Chip>
        ))}
      </Marquee>
    </Wrapper>
  );
};
