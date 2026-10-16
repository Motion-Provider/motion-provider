import { MotionContainer } from "motion-provider";
import type { ShowcaseComponentProps } from "@/types/showcase.type";

export default function MotionContainerDemo({
  className,
  controller,
}: ShowcaseComponentProps) {
  return (
    <div className={className}>
      <MotionContainer
        animation={{
          mode: ["fadeIn", "filterBlurIn"],
        }}
        className="size-24 rounded-full bg-accent"
        controller={controller}
      />
    </div>
  );
}
