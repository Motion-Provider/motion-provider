"use client";

import { MotionContainer, useController } from "motion-provider";

export default function ReleaseBanner() {
  const controls = useController();
  return (
    <section
      aria-label="Preview announcement"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Release manager
      </p>
      <h3 className="mt-1 text-base font-semibold">Preview announcement</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-accent px-3 py-2 font-semibold text-background hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => {
            controls.reset();
            void controls.play();
          }}
        >
          Replay banner
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-lg border border-border bg-background px-3 py-2 font-medium hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => controls.pause()}
        >
          Pause
        </button>
      </div>
      <div className="mt-3 overflow-hidden rounded-xl border border-accent/25 bg-gradient-to-br from-accent/20 to-surface-secondary p-4">
        <MotionContainer
          className="text-foreground"
          animation={{ mode: "slideUp", duration: 1.2 }}
          controller={controls}
        >
          <strong className="block text-base">Meet the activity feed</strong>
          <span className="mt-1 block text-xs text-muted">
            All workspace updates in one place.
          </span>
        </MotionContainer>
      </div>
    </section>
  );
}
