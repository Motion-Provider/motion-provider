import { ScrollShadow } from "@heroui/react";
import { MotionImage } from "motion-provider";
import Image from "next/image";
import { useState } from "react";
import data from "@/constants/showcase.data";
import { cn } from "@/lib/utils";
import type { ShowcaseComponentProps } from "@/types/types-showcase";

const images = data
  .map(({ imgSrc }, idx) => (idx < 4 ? imgSrc : null))
  .filter((item) => item !== null) as string[];

export default function MotionImageDemo({
  className,
  controller,
}: ShowcaseComponentProps) {
  const [currentImg, setCurrentImg] = useState<string>(
    "/assets/backgrounds/motion-image.webp",
  );

  return (
    <>
      <MotionImage
        config={{
          img: currentImg,
          pieces: 64,
          delayLogic: "sinusoidal",
          duration: 1.5,
        }}
        animation={{
          mode: ["clipDown", "filterBlurIn"],
          transition: "gentle",
          duration: 1,
        }}
        controller={controller}
        wrapperClassName={cn("size-60 rounded-2xl overflow-hidden", className)}
      />
      <ScrollShadow className="max-h-60 flex flex-col absolute right-4 gap-2 scrollbar-none p-1 z-50">
        {images.map((src) => (
          <Image
            src={src}
            alt="cover image"
            onClick={() => setCurrentImg(src)}
            className={cn(
              "size-12 rounded-full transition-transform hover:scale-110 duration-200 active:scale-90",
              currentImg === src && "scale-110 border-2 border-accent",
            )}
            width={48}
            height={48}
            key={src}
          />
        ))}
      </ScrollShadow>
    </>
  );
}
