import { MotionText } from "motion-provider";
import type { ModuleProps } from "./types";

export default function TextSplit({ controller }: ModuleProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <MotionText
        elementType="h2"
        wrapperClassName="text-3xl font-semibold"
        animation={{ mode: "fadeUp", duration: 0.5 }}
        config={{ mode: "chars", delayLogic: "linear", duration: 0.04 }}
        controller={controller}
      >
        Human-first motion
      </MotionText>
      <MotionText
        elementType="p"
        wrapperClassName="text-sm opacity-80"
        animation={{ mode: ["fadeIn", "filterBlurIn"], duration: 0.6 }}
        config={{ mode: "words", delayLogic: "wave", duration: 0.12, space: 4 }}
        controller={controller}
      >
        Split by character, split by word.
      </MotionText>
    </div>
  );
}
