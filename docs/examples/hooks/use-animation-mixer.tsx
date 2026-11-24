"use client";

import {
  Motion,
  type AnimationModule,
  useAnimationMixer,
} from "motion-provider";
import { useState } from "react";

const reveal = {
  initial: { opacity: 0.2 },
  animate: { opacity: 0.88 },
} as const satisfies AnimationModule;

const lift = {
  initial: { y: 18 },
  animate: { y: 0 },
} as const satisfies AnimationModule;

const emphasis = {
  initial: {
    opacity: 0.55,
    scale: 0.96,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
} as const satisfies AnimationModule;

const modules = [reveal, lift, emphasis] as const;

export default function MergeReadinessPreview() {
  const [reverse, setReverse] = useState(false);

  const definition = useAnimationMixer({
    animations: modules,
    reverse,
  });

  return (
    <article className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface text-foreground shadow-xl shadow-black/10">
      <header className="flex items-start justify-between gap-4 border-b border-border p-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
            Pull request
          </p>
          <h3 className="mt-1 text-lg font-semibold">Merge readiness</h3>
          <p className="mt-1 text-sm text-muted">
            Three animation modules become one definition.
          </p>
        </div>

        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-500">
          Ready
        </span>
      </header>

      <div className="p-5">
        <Motion
          className="rounded-2xl border border-border bg-background p-4"
          controller={{ trigger: true }}
          definition={definition}
          timing={{ duration: 0.62, easing: "ease-out" }}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">motion-api-guides</p>
              <p className="mt-1 text-xs text-muted">
                6 checks passed · no blocking reviews
              </p>
            </div>

            <div
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 text-lg text-emerald-500"
            >
              ✓
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl border border-border p-3">
              <dt className="text-xs text-muted">Tests</dt>
              <dd className="mt-1 font-semibold">42</dd>
            </div>
            <div className="rounded-xl border border-border p-3">
              <dt className="text-xs text-muted">Reviewers</dt>
              <dd className="mt-1 font-semibold">2 / 2</dd>
            </div>
            <div className="rounded-xl border border-border p-3">
              <dt className="text-xs text-muted">Conflicts</dt>
              <dd className="mt-1 font-semibold">0</dd>
            </div>
          </dl>
        </Motion>

        <section
          aria-label="Merged properties"
          className="mt-4 rounded-xl border border-dashed border-border p-3"
        >
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">
            Merged definition
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <code className="rounded-md bg-background px-2 py-1">
              opacity: 0.55 → 1
            </code>
            <code className="rounded-md bg-background px-2 py-1">
              y: 18 → 0
            </code>
            <code className="rounded-md bg-background px-2 py-1">
              scale: 0.96 → 1
            </code>
            <code className="rounded-md bg-background px-2 py-1">
              blur: 6px → 0px
            </code>
          </div>
        </section>
      </div>

      <footer className="border-t border-border bg-background/60 p-4">
        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3">
          <span>
            <span className="block text-sm font-semibold">Swap endpoints</span>
            <span className="mt-0.5 block text-xs text-muted">
              Compare the merged definition in the opposite direction.
            </span>
          </span>

          <input
            type="checkbox"
            className="size-4 shrink-0 accent-accent"
            checked={reverse}
            onChange={(event) => setReverse(event.currentTarget.checked)}
          />
        </label>
      </footer>
    </article>
  );
}
