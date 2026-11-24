"use client";

import {
  Motion,
  type AnimationModule,
  useAnimation,
} from "motion-provider";
import { useState } from "react";

const capacity = {
  initial: {
    opacity: 0.72,
    scaleX: 0.34,
  },
  animate: {
    opacity: 1,
    scaleX: 1,
  },
} as const satisfies AnimationModule;

export default function WorkerCapacityPreview() {
  const [surgeEnabled, setSurgeEnabled] = useState(false);

  const playback = useAnimation({
    reverseAnimation: !surgeEnabled,
  });

  return (
    <article className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface text-foreground shadow-xl shadow-black/10">
      <header className="flex items-start justify-between gap-4 border-b border-border p-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
            Worker pool
          </p>
          <h3 className="mt-1 text-lg font-semibold">Checkout processing</h3>
          <p className="mt-1 text-sm text-muted">
            Scale capacity when traffic crosses the normal threshold.
          </p>
        </div>

        <span
          className={
            surgeEnabled
              ? "rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-background"
              : "rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted"
          }
        >
          {surgeEnabled ? "Surge on" : "Base load"}
        </span>
      </header>

      <div className="space-y-5 p-5">
        <div>
          <div className="mb-2 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">Available capacity</p>
              <p className="text-xs text-muted">
                {surgeEnabled ? "12 workers online" : "4 workers online"}
              </p>
            </div>
            <strong className="text-2xl tabular-nums">
              {surgeEnabled ? "100%" : "34%"}
            </strong>
          </div>

          <div
            aria-hidden="true"
            className="h-3 overflow-hidden rounded-full bg-border"
          >
            <Motion
              className="h-full origin-left rounded-full bg-accent"
              controller={{ ...playback, trigger: true }}
              definition={capacity}
              timing={{ duration: 0.58, easing: "ease-out" }}
            />
          </div>

          <div className="mt-2 flex justify-between text-xs text-muted">
            <span>4 base</span>
            <span>12 max</span>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl border border-border bg-background p-3">
            <dt className="text-xs text-muted">Queue</dt>
            <dd className="mt-1 font-semibold tabular-nums">
              {surgeEnabled ? "18" : "47"}
            </dd>
          </div>
          <div className="rounded-xl border border-border bg-background p-3">
            <dt className="text-xs text-muted">p95</dt>
            <dd className="mt-1 font-semibold tabular-nums">
              {surgeEnabled ? "186 ms" : "412 ms"}
            </dd>
          </div>
          <div className="rounded-xl border border-border bg-background p-3">
            <dt className="text-xs text-muted">Region</dt>
            <dd className="mt-1 font-semibold">WAW</dd>
          </div>
        </dl>
      </div>

      <footer className="border-t border-border bg-background/60 p-4">
        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3">
          <span>
            <span className="block text-sm font-semibold">
              Enable surge capacity
            </span>
            <span className="mt-0.5 block text-xs text-muted">
              Reverse the meter when the pool returns to base load.
            </span>
          </span>

          <input
            type="checkbox"
            className="size-4 shrink-0 accent-accent"
            checked={surgeEnabled}
            onChange={(event) => setSurgeEnabled(event.currentTarget.checked)}
          />
        </label>
      </footer>
    </article>
  );
}
