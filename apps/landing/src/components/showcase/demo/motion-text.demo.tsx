import { MotionText } from "motion-provider";
import type { ShowcaseComponentProps } from "@/types/types-showcase";

export default function MotionTextDemo({
  className,
  controller,
}: ShowcaseComponentProps) {
  return (
    <div className={className}>
      <MotionText
        elementType="h3"
        animation={{
          mode: ["flash", "filterBlurIn"],
        }}
        config={{
          delayLogic: "chaotic",
        }}
        controller={controller}
        wrapperClassName="max-w-62 text-6xl tracking-tighter font-bold"
      >
        Motion Provider
      </MotionText>
    </div>
  );
}
