import { MotionContainer, MotionLink } from "motion-provider";
import type { ModuleProps } from "./types";

export default function LinkExit({ controller }: ModuleProps) {
  if (!controller) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <MotionContainer
        className="size-16 rounded-xl bg-accent"
        animation={{ mode: ["fadeUp", "scaleZoomIn"], duration: 0.6 }}
        controller={controller}
      />
      <MotionLink
        href="/"
        controller={controller}
        navigate={() => {
          void controller.play();
        }}
        className="text-sm underline underline-offset-4"
      >
        Leave the page (the exit plays first)
      </MotionLink>
    </div>
  );
}
