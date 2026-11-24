"use client";

import { Motion, useController } from "motion-provider";
import { useId, useState } from "react";

const fill = { initial: { scaleX: 0 }, animate: { scaleX: 1 } } as const;

export default function TimelinePreview() {
  const [progress, setProgress] = useState(0);
  const sliderId = useId();
  const controls = useController();
  return (
    <section
      aria-label="Review a loading transition"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Motion editor
      </p>
      <h3 className="mt-1 text-base font-semibold">
        Review a loading transition
      </h3>
      <label
        className="mt-3 flex items-center justify-between gap-2"
        htmlFor={sliderId}
      >
        Timeline{" "}
        <output className="font-secondary tabular-nums text-accent">
          {Math.round(progress * 100)}%
        </output>
      </label>
      <input
        id={sliderId}
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={progress}
        className="mt-2 w-full cursor-pointer accent-accent"
        onChange={(event) => {
          const value = event.currentTarget.valueAsNumber;
          setProgress(value);
          controls.seek(value);
        }}
      />
      <div
        aria-hidden="true"
        className="mt-4 overflow-hidden rounded-full bg-border"
      >
        <Motion
          className="h-3 origin-left rounded-full bg-gradient-to-r from-accent to-warning"
          definition={fill}
          timing={{ duration: 1, easing: "linear" }}
          controller={controls}
        />
      </div>
    </section>
  );
}
