"use client";

import { Motion, useController } from "motion-provider";
import { useState } from "react";

const fill = { initial: { scaleX: 0 }, animate: { scaleX: 1 } } as const;

export default function SeekContinuity() {
  const controls = useController();
  const [duration, setDuration] = useState(1);
  const [hasSeek, setHasSeek] = useState(false);
  const progress = hasSeek ? 0.35 : 0;

  return (
    <section
      aria-label="Timeline preview"
      className="w-full max-w-sm space-y-3 rounded-xl border border-border bg-surface p-4 text-sm text-foreground"
    >
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg bg-accent px-3 py-2 font-medium text-background"
          onClick={() => {
            controls.seek(0.35);
            setHasSeek(true);
          }}
        >
          Seek to 35%
        </button>
        <button
          type="button"
          className="rounded-lg border border-border px-3 py-2"
          onClick={() => setDuration(duration === 1 ? 2 : 1)}
        >
          {duration === 1 ? "Double duration" : "Use 1 second"}
        </button>
      </div>
      <output className="block tabular-nums">
        Seek {Math.round(progress * 100)}% ·{" "}
        {Math.round(progress * duration * 1000)} ms
      </output>
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-full bg-surface-secondary"
      >
        <Motion
          definition={fill}
          controller={controls}
          timing={{ duration, easing: "linear" }}
          className="h-2 origin-left rounded-full bg-accent"
        />
      </div>
    </section>
  );
}
