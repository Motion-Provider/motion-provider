import { MotionText } from "motion-provider";
import type { ModuleProps } from "../../types";

export default function WordReveal({ controller }: ModuleProps) {
  return (
    <MotionText
      elementType="p"
      wrapperClassName="max-w-xl text-base leading-relaxed"
      className="inline-block"
      animation={{
        mode: ["fadeIn", "filterBlurIn"],
        transition: "gentle",
        duration: 0.65,
      }}
      config={{
        mode: "words",
        delayLogic: "wave",
        duration: 0.1,
      }}
      controller={controller}
    >
      Thoughtful motion makes an interface feel clear, responsive, and alive.
    </MotionText>
  );
}
