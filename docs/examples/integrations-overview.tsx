"use client";

import { MotionContainer, useController } from "motion-provider";
import { useEffect } from "react";
import type { ModuleProps } from "./types";

export default function IntegrationsOverviewDemo({
  controller: sharedController,
}: ModuleProps) {
  const localController = useController();
  const controller = sharedController ?? localController;

  useEffect(() => {
    if (!sharedController) void controller.play();
  }, [controller, sharedController]);

  return (
    <div className="w-full max-w-xl space-y-5">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void controller.play()}
          className="rounded-lg bg-accent px-3 py-2 text-sm font-medium text-background"
        >
          Play
        </button>
        <button
          type="button"
          onClick={() => void controller.reverse()}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium"
        >
          Reverse
        </button>
        <button
          type="button"
          onClick={() => controller.pause()}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium"
        >
          Pause
        </button>
        <button
          type="button"
          onClick={() => {
            controller.reset();
            void controller.play();
          }}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium"
        >
          Replay
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MotionContainer
          controller={controller}
          animation={{
            mode: ["fadeUp", "filterBlurIn"],
            duration: 0.8,
          }}
          className="grid min-h-28 place-items-center rounded-xl border border-border bg-accent/10 p-4 text-center text-sm font-medium"
        >
          Shared controller
        </MotionContainer>
        <MotionContainer
          controller={controller}
          animation={{
            mode: ["fadeDown", "scaleZoomIn"],
            duration: 0.8,
            delay: 0.15,
          }}
          className="grid min-h-28 place-items-center rounded-xl border border-border bg-accent/10 p-4 text-center text-sm font-medium"
        >
          Coordinated playback
        </MotionContainer>
      </div>
    </div>
  );
}
