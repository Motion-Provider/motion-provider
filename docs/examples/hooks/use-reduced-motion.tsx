"use client";

import {
  MotionContainer,
  useController,
  useReducedMotion,
} from "motion-provider";

export default function MotionSettings() {
  const reduced = useReducedMotion();
  const controls = useController();
  return (
    <section
      aria-label="Motion preferences"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Accessibility
      </p>
      <h3 className="mt-1 text-base font-semibold">Motion preferences</h3>
      <dl className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-surface-secondary px-3 py-2.5">
        <dt>System preference</dt>
        <dd className="rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
          {reduced ? "Reduce motion" : "Standard motion"}
        </dd>
      </dl>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-accent px-3 py-2 font-semibold text-background hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => {
            controls.reset();
            void controls.play();
          }}
        >
          Preview notification
        </button>
      </div>
      <MotionContainer
        className="mt-3 rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-success"
        animation={{ mode: reduced ? "fadeIn" : "fadeUp" }}
        controller={controls}
      >
        Preferences saved
      </MotionContainer>
    </section>
  );
}
