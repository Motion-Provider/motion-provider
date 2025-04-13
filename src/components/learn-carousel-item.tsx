import MotionContainer from "@/motion/motion-container";
import { CarouselItem } from "./ui/carousel";
import { FC } from "react";
import { CarouselItemProps } from "@/interfaces";
import { ArrowRight, CheckCheck } from "lucide-react";
import MotionText from "@/motion/motion-text";
import MotionChain from "@/motion/motion-chain";
import { Button } from "./ui/button";
import Link from "next/link";

export const LearnCarouselItem: FC<CarouselItemProps> = ({
  desc,
  link,
  title,
  utils,
}) => {
  return (
    <CarouselItem className="w-full h-auto border rounded-xl dark cursor-pointer pointer-events-none">
      <div className="size-full rounded-xl relative ">
        <MotionContainer
          animation={{
            mode: ["fadeIn", "bounceX"],
            transition: "slowSmooth",
            delay: 0.5,
            duration: 2,
          }}
          elementType={"div"}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-gradient-to-br from-pink-500 via-15% to-transparent size-60 rounded-full blur-[50px] z-0 "
        />
        <MotionContainer
          animation={{
            mode: ["fadeIn", "bounceX", "colorShift"],
            transition: "slowSmooth",
            delay: 0,
            duration: 2,
          }}
          elementType={"div"}
          className="absolute bottom-24 left-24 bg-gradient-to-br from-cyan-800  via-15% to-transparent size-60 rounded-full blur-[50px] "
        />
        <MotionContainer
          animation={{
            mode: ["fadeIn", "bounceY", "textShimmer"],
            transition: "slowSmooth",
            delay: 1,
            duration: 2,
          }}
          elementType={"div"}
          className="absolute bottom-0 right-0   bg-gradient-to-br from-emerald-300  via-15% to-transparent size-48 rounded-full blur-[50px]  z-0"
        />
        <div className="size-full z-50 absolute items-center justify-center flex flex-row">
          <div className="w-1/2 h-full flex flex-col items-start justify-center gap-1 px-16 ">
            <MotionText
              animation={{
                mode: ["fadeUp", "filterBlurIn"],
                transition: "smooth",
                delay: 0.5,
                duration: 0.5,
              }}
              config={{
                duration: 0.125,
                mode: "chars",
              }}
              elementType={"p"}
              className="font-bold text-3xl font-secondary "
              children={title}
            />
            <MotionText
              animation={{
                mode: ["fadeUp", "filterBlurIn"],
                transition: "smooth",
                delay: 0,
                duration: 0.5,
              }}
              children={desc}
              elementType="p"
              config={{
                duration: 0.125,
                mode: "words",
                space: 1,
              }}
              className="-mx-[2px]"
              wrapperClassName="tracking-tighter text-sm  text-stone-400"
            />
            <Link href={link}>
              <Button
                className="mt-2 pointer-events-auto"
                variant="default"
                size={"sm"}
              >
                Learn For Free <ArrowRight />
              </Button>
            </Link>
          </div>
          <div className="w-1/2 h-full gap-3 py-8 relative overflow-hidden">
            <MotionChain
              animations={utils.map((_, idx) => ({
                mode: [idx % 2 === 0 ? "fadeUp" : "fadeDown", "filterBlurIn"],
                transition: "cubicBounce",
                delay: 0,
                duration: 1,
              }))}
              elementType={"ul"}
              className="flex flex-col gap-1 text-sm w-full text-stone-300 italic items-center justify-center"
              config={{
                duration: 0.5,
                isDynamicallyQueued: true,
                delayLogic: "linear",
              }}
              controller={{
                configView: {
                  amount: "some",
                  once: false,
                },
              }}
            >
              {utils.map((item, idx) => (
                <li
                  key={idx}
                  className="flex flex-row gap-2 text-shadow text-shadow-accent-foreground w-full "
                >
                  <CheckCheck className="size-5 shrink-0" />
                  <span className="">{item}</span>
                </li>
              ))}
            </MotionChain>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
};
