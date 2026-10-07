import { MotionContainer } from "motion-provider";

export default function MotionContainerDemo() {
  return (
    <MotionContainer
      animation={{
        mode: ["fadeIn", "filterBlurIn"],
      }}
      className="size-24 rounded-full bg-accent"
    />
  );
}
