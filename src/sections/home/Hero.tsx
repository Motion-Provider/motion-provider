import { Card } from "@/components/card";
import { StickyFooter } from "@/components/sticky-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionProps } from "@/interfaces";
import cardsLib from "@/lib/root/cards.lib";
import { cn } from "@/lib/utils";
import { useAnimation } from "@/motion/hooks/use-animation";
import { useAnimationControl } from "@/motion/hooks/use-animation-control";
import MotionChain from "@/motion/motion-chain";
import { AnimationKeys, MotionAnimationProps } from "@/motion/types";
import getRandomAnimation from "@/motion/utils/getRandomAnimation";
import { Play } from "lucide-react";
import { FC } from "react";

const title = String("Motion Provider.").split("");

const cardAnimations = cardsLib.map((_) => ({
  mode: ["filterBlurIn", "fadeUp"],
  duration: 0.5,
  delay: 0,
  transition: "smooth",
})) as MotionAnimationProps[];

const titleAnimations = title.map((_) => ({
  mode: getRandomAnimation({ count: 1 }) as AnimationKeys[],
  transition: "cubicFastEnd",
  duration: 2,
})) as MotionAnimationProps[];

const HomeHero: FC<SectionProps> = ({ className }) => {
  const { control, onReverse } = useAnimationControl();
  const controller = useAnimation(control);
  return (
    <>
      <Button className="absolute top-24 right-24 " onClick={onReverse}>
        <Play />
      </Button>
      <section
        className={cn(
          "max-w-5xl mx-auto h-screen relative overflow-hidden",
          className
        )}
      >
        <div className="h-2/3 w-full justify-center flex items-center flex-col  -mt-12">
          <Badge variant="default">New Release V2.0 🚀</Badge>
          <div className="flex flex-wrap ">
            <MotionChain
              config={{
                duration: 0.5,
                delayLogic: "linear",
              }}
              elementType={"span"}
              className="lg:text-7xl text-4xl tracking-tighter font-extralight px-1 text-transparent bg-clip-text bg-linear-to-b from-white to-transparent"
              animations={titleAnimations}
            >
              {title}
            </MotionChain>
          </div>
        </div>
        <div className="h-auto lg:w-full grid grid-cols-2 lg:gap-4 gap-2 lg:-mt-32 -mt-42">
          <MotionChain
            config={{
              duration: 0.5,
              delayLogic: "linear",
            }}
            elementType={"div"}
            animations={cardAnimations}
            controller={controller}
          >
            {cardsLib.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </MotionChain>
        </div>
        <StickyFooter className="bottom-4 left-1/2 -translate-x-1/2 absolute w-auto" />
      </section>
    </>
  );
};

export default HomeHero;
