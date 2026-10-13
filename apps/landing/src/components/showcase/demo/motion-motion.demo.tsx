import { SparkleIcon } from "lucide-react";
import { Motion } from "motion-provider";
import { spin } from "motion-provider/presets";
import type { ShowcaseComponentProps } from "@/types/types-showcase";

export default function MotionMotionDemo({
  className,
  controller,
}: ShowcaseComponentProps) {
  return (
    <div className={className}>
      <Motion
        definition={spin}
        timing={{
          easing: "ease-out",
          duration: 2,
        }}
        className="size-24 rounded-b-full rounded-e-full border border-accent bg-accent/20 grid place-items-center"
        controller={controller}
      >
        <SparkleIcon className="size-5 text-accent/20 fill-accent" />
      </Motion>
    </div>
  );
}
