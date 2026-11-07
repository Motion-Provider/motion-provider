import { MotionImage } from "motion-provider";
import Image from "next/image";
import { useState } from "react";
import data from "@/constants/showcase.data";
import { cn } from "@/lib/utils";
import type { ShowcaseComponentProps } from "@/types/showcase.type";

const images = data
  .map(({ imgSrc }, idx) => (idx < 4 ? imgSrc : null))
  .filter((item) => item !== null) as string[];

export default function MotionImageDemo({
  className,
  controller,
}: ShowcaseComponentProps) {
  const [currentImg, setCurrentImg] = useState<string>(
    "/assets/backgrounds/motion-image-illustration.webp",
  );

  return (
    <div
      className={cn(
        "flex gap-8 justify-items-center-safe items-center-safe",
        className,
      )}
    >
      <MotionImage
        config={{
          img: currentImg,
          pieces: 49,
          delayLogic: "sinusoidal",
          duration: 1.5,
        }}
        animation={{
          mode: ["clipDown", "filterBlurIn"],
          transition: "gentle",
          duration: 1,
        }}
        controller={controller}
        wrapperClassName={cn("size-60 rounded-2xl overflow-hidden")}
      />
      <div className="h-auto flex flex-col md:gap-2 gap-px p-1">
        {images.map((src) => (
          <Image
            src={src}
            alt="cover image"
            onClick={() => setCurrentImg(src)}
            className={cn(
              "md:size-12 size-10 rounded-full transition-transform",
              "hover:scale-110 duration-200 active:scale-90 z-50",
              currentImg === src && "scale-110 border-2 border-accent",
            )}
            width={48}
            height={48}
            key={src}
          />
        ))}
      </div>
    </div>
  );
}
