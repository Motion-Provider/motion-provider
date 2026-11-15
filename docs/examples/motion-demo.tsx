import { MotionContainer } from "motion-provider";
import type { ModuleProps } from "./types";

export default function MotionDemo({ controller, className }: ModuleProps) {
  return (
    <MotionContainer
      animation={{ mode: ["fadeIn", "filterBlurIn"] }}
      controller={controller}
      className={["size-16 rounded-full bg-accent", className].join(" ")}
    />
  );
}
