import { MotionText } from "motion-provider";
import type { ModuleProps } from "../../types";

export default function CharacterReveal({ controller }: ModuleProps) {
  return (
    <MotionText
      elementType="h2"
      wrapperClassName="text-3xl font-semibold tracking-tight"
      className="inline-block"
      animation={{ mode: "fadeUp", duration: 0.55 }}
      config={{
        mode: "chars",
        delayLogic: "linear",
        duration: 0.035,
      }}
      controller={controller}
    >
      Motion, one character at a time.
    </MotionText>
  );
}
