import { SectionProps } from "@/interfaces";
import React, { FC, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselApi, CarouselContent } from "../ui/carousel";
import carouselLib from "@/lib/learn/carousel.lib";
import { cn } from "@/lib/utils";
import { LearnCarouselItem } from "../learn-carousel-item";
import { Item } from "./item";

const MotionTube: FC<SectionProps> = ({ className }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const plugin = useRef(
    Autoplay({ delay: 5000, active: true, stopOnInteraction: false })
  );

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleSelect = (index: number) => {
    api?.scrollTo(index);
  };
  return (
    <section className={className}>
      <div className="h-[250px] relative py-8 cursor-grab">
        <Carousel
          plugins={[plugin.current]}
          setApi={setApi}
          className="size-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="h-[250px] ml-[0.5px]">
            {carouselLib.map((_, index) => (
              <Item currentItem={current + 1} key={index}>
                asd
              </Item>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex gap-1 text-center z-20 mt-2 absolute -translate-x-1/2 left-1/2 ">
        {carouselLib.map((_, index) => (
          <button
            className={cn(
              "rounded-xl transition-all focus:outline-none cursor-pointer",
              current === index
                ? "h-2 w-4 bg-white hover:bg-secondary/80"
                : "h-2 w-2 bg-white/50 hover:bg-white"
            )}
            aria-label={`Slide ${index + 1} of ${carouselLib.length}`}
            onClick={() => handleSelect(index)}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default MotionTube;
