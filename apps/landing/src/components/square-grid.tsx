import { MotionImage } from "motion-provider";
import { cn } from "@/lib/utils";

export default function SquareGrid({ className }: { className?: string }) {
  return (
    <div className="absolute top-0 left-0 size-full grid place-items-center-safe">
      <MotionImage
        animation={{
          mode: ["fadeIn", "filterBlurIn", "skewX45"],
          duration: 0.75,
          transition: "gentle",
        }}
        config={{
          img: "/assets/backgrounds/grid-background-be9b88fc.webp",
          pieces: 121,
          duration: 0.1,
          fn: "hover",
          delayLogic: "sinusoidal",
        }}
        wrapperClassName={cn(
          "top-0 left-0 z-10 absolute size-full aspect-video overflow-hidden",
          className,
        )}
      />
    </div>
  );
}
