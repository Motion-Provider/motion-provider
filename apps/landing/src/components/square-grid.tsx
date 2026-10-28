import { MotionImage } from "motion-provider";
import { getAnimation } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { animation, config } = getAnimation("squareGrid");

export default function SquareGrid({ className }: { className?: string }) {
  return (
    <div className="absolute top-0 left-0 size-full grid place-items-center-safe">
      <MotionImage
        animation={animation}
        config={{
          img: "/assets/backgrounds/grid-background-be9b88fc.webp",
          ...config,
        }}
        wrapperClassName={cn(
          "top-0 left-0 z-10 absolute size-full aspect-video overflow-hidden",
          className,
        )}
      />
    </div>
  );
}
