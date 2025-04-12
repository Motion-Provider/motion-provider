import { FC } from "react";
import { cn } from "@/lib/utils";
import cardsLib from "@/lib/root/cards.lib";
import { Card } from "@/components/card";
import { FullScreenModal as Modal } from "@/components/fullscreen-permission";
import { StickyFooter } from "@/components/sticky-footer";
import { Badge } from "@/components/ui/badge";
import { SectionProps } from "@/interfaces";
import { useAnimation } from "@/motion/hooks/use-animation";
import { useAnimationControl } from "@/motion/hooks/use-animation-control";
import MotionChain from "@/motion/motion-chain";
import { MotionAnimationProps, MotionControllerProps } from "@/motion/types";
import MotionText from "@/motion/motion-text";
import { useMobile } from "@/hooks/useMobile";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import MotionLink from "@/motion/motion-link";

const cardAnimations = cardsLib.map((_) => ({
  mode: ["filterBlurIn", "fadeUp"],
  duration: 0.5,
  delay: 0,
  transition: "smooth",
})) as MotionAnimationProps[];

const HomeHero: FC<SectionProps> = ({ className }) => {
  const cookie = useSelector((state: RootState) => state.cookie.activated);
  const { isFullscreen } = useSelector((state: RootState) => state.fullscreen);

  const isMobile = useMobile();

  const { control, onReverse } = useAnimationControl();
  const controller = useAnimation(control);

  const animationController =
    !isMobile &&
    ({
      ...controller,
      trigger: cookie,
    } as MotionControllerProps);

  return (
    <section
      className={cn(
        "max-w-6xl mx-auto h-screen relative overflow-hidden  px-8",
        className
      )}
    >
      {!cookie && <Modal onClick={() => console.log("clicked")} />}
      <div className="h-2/3 w-full justify-center flex items-center flex-col  -mt-12">
        <Badge variant="outline" className="dark mb-4">
          New Release V2.0 🚀
        </Badge>
        <MotionText
          elementType="div"
          animation={{
            mode: ["fadeUp", "filterBlurIn", "flash", "bounceY"],
            transition: "smooth",
            duration: 2,
          }}
          config={{
            duration: 0.18,
            mode: "chars",
            delayLogic: "bounce",
            space: 2,
          }}
          className="lg:text-8xl text-4xl tracking-tighter font-extralight px-1 text-transparent bg-clip-text bg-linear-to-b from-white to-transparent"
          controller={animationController as MotionControllerProps}
        >
          Motion Provider.
        </MotionText>
      </div>
      <div className="h-auto lg:w-full grid grid-cols-2 lg:gap-4 gap-2 lg:-mt-32 -mt-42">
        <MotionChain
          config={{
            duration: 0.5,
            delayLogic: "linear",
          }}
          elementType={"div"}
          animations={cardAnimations}
          controller={animationController as MotionControllerProps}
        >
          {cardsLib.map((card, index) => (
            <MotionLink
              href={card.link}
              onReverse={onReverse}
              timer={2000}
              className="size-auto flex items-center justify-"
            >
              <Card key={index} {...card} />
            </MotionLink>
          ))}
        </MotionChain>
      </div>
      <StickyFooter className="bottom-4 left-1/2 -translate-x-1/2 absolute w-auto" />
    </section>
  );
};

export default HomeHero;
