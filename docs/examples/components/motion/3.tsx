"use client";

import { Motion, useController } from "motion-provider";
import { heartbeat } from "motion-provider/presets";

export default function ControllableBadge() {
  const controller = useController();

  return (
    <div className="flex flex-col items-center gap-4">
      <Motion
        className="size-16 rounded-full bg-accent"
        definition={heartbeat}
        timing={{ duration: 0.8, iterations: 2 }}
        controller={controller}
      />
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-md border border-border px-3 py-1.5 text-xs"
          onClick={() => void controller.play()}
        >
          Play
        </button>
        <button
          type="button"
          className="rounded-md border border-border px-3 py-1.5 text-xs"
          onClick={() => void controller.reverse()}
        >
          Reverse
        </button>
        <button
          type="button"
          className="rounded-md border border-border px-3 py-1.5 text-xs"
          onClick={() => controller.reset()}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
