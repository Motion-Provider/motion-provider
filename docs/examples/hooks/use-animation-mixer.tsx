"use client";

import { Motion, useAnimationMixer } from "motion-provider";
import { useState } from "react";

const modules = [
  { initial: { opacity: 0.45 }, animate: { opacity: 1 } },
  { initial: { y: 14 }, animate: { y: 0 } },
] as const;

export default function UploadQueue() {
  const [reverse, setReverse] = useState(false);
  const definition = useAnimationMixer({ animations: modules, reverse });
  return (
    <section
      aria-label="Upload queue"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Media library
      </p>
      <h3 className="mt-1 text-base font-semibold">Upload queue</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="size-4 accent-accent"
            checked={reverse}
            onChange={(event) => setReverse(event.currentTarget.checked)}
          />
          Swap endpoints
        </label>
      </div>
      <div className="mt-3">
        <Motion
          definition={definition}
          timing={{ duration: 0.6 }}
          controller={{ trigger: true }}
          className="rounded-xl border border-border bg-surface-secondary px-3 py-2.5"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">campaign.webp</span>
            <span className="text-xs text-success">Uploaded</span>
          </div>
          <p className="mt-1 text-xs text-muted">840 KB · Ready to publish</p>
        </Motion>
      </div>
    </section>
  );
}
