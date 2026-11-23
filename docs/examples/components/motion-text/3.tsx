import {
  MotionText,
  type AnimationModule,
} from "motion-provider";
import type { ModuleProps } from "../../types";

const lift = {
  initial: {
    opacity: 0,
    transform: "translateY(12px)",
  },
  animate: {
    opacity: 1,
    transform: "translateY(0px)",
  },
} as const satisfies AnimationModule;

export default function ComposedText({ controller }: ModuleProps) {
  return (
    <MotionText
      elementType="h2"
      wrapperClassName="text-2xl font-semibold"
      className="inline-block"
      animation={{
        mode: [lift, "filterBlurIn"],
        transition: "gentle",
        duration: 0.7,
      }}
      config={{
        mode: "words",
        delayLogic: "linear",
        duration: 0.075,
        space: "0.02em",
      }}
      controller={controller}
    >
      Combine a custom module with a built-in preset.
    </MotionText>
  );
}
