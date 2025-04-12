import { SectionProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import { FC, useRef, useState } from "react";
import { Search } from "./search";
import MotionText from "@/motion/motion-text";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import libraryLib from "@/lib/learn/library.lib";
import { ListItem } from "./list-item";
import MotionChain from "@/motion/motion-chain";
import { MotionAnimationProps } from "@/motion/types";

const listItemAnimations = libraryLib.map((_, idx) => ({
  mode:
    idx % 2 === 0
      ? ["filterBlurIn", "fadeRight"]
      : ["filterBlurIn", "fadeLeft"],
  duration: 0.5,
  delay: 0,
  transition: "smooth",
})) as MotionAnimationProps[];

export const List: FC<SectionProps> = ({ className }) => {
  const [search, setSearch] = useState<string>("");
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  return (
    <section
      className={cn(
        "max-w-6xl mx-auto h-screen relative overflow-hidden dark",
        className
      )}
    >
      <div className="size-full z-50 items-center justify-center flex flex-col gap-2">
        <div className="h-1/12 w-full items-center justify-center flex ">
          <MotionText
            animation={{
              mode: ["filterBlurIn", "textShimmer"],
              transition: "easeIn",
              delay: 0.5,
            }}
            config={{
              duration: 0.25,
              mode: "chars",
              space: 1,
              delayLogic: "chaotic",
            }}
            elementType={"h1"}
            wrapperClassName="text-xl font-base font-secondary w-1/2"
          >
            Motion Provider | Docs
          </MotionText>
          <Search handleChange={(e) => setSearch(e)} value={search} />
        </div>
        <div className="size-full">
          <div className="h-2/5 w-full relative">
            <Carousel
              plugins={[plugin.current]}
              className="size-full"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent className="h-72">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="size-full">
                    <div className="size-full">
                      <Card className="size-full ">
                        <CardContent className="flex size-full items-center justify-center ">
                          <span className="text-4xl font-semibold">
                            {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="h-3/5 w-full overflow-y-scroll relative flex flex-col gap-4">
            <MotionChain
              animations={listItemAnimations}
              elementType={"ul"}
              config={{
                delayLogic: "linear",
                duration: 0.5,
              }}
            >
              {libraryLib.map((val, idx) => (
                <ListItem {...val} key={idx} />
              ))}
            </MotionChain>
          </div>
        </div>
      </div>
    </section>
  );
};
