import { MotionContainer } from "motion-provider";
import type { ModuleProps } from "../../types";

export default function ({ controller }: ModuleProps) {
  return (
    <MotionContainer
      elementType="section"
      className="rounded-xl p-6"
      animation={{
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.8,
      }}
      controller={controller}
    >
      <h2>Interfaces that move.</h2>
      <p>One element, composed from two presets.</p>
    </MotionContainer>
  );
}
