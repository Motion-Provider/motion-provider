import { MotionContainer } from "motion-provider";
import type { ModuleProps } from "./types";

export default function MotionDemo({ controller }: ModuleProps) {
  return (
    <MotionContainer
      className="size-16 rounded-full bg-accent"
      animation={{ mode: ["fadeIn", "filterBlurIn"] }}
      controller={controller}
    />
  );
}
