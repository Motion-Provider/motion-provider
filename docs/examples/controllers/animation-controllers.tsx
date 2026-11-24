"use client";

import { MotionContainer, useController } from "motion-provider";

export default function MediaPreview() {
  const controls = useController();
  return (
    <section
      aria-label="Publishing preview"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Campaign studio
      </p>
      <h3 className="mt-1 text-base font-semibold">Publishing preview</h3>
      <p className="mt-1 text-xs text-muted">
        Review the two entrance effects as a group.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-accent px-3 py-2 font-semibold text-background hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => void controls.play()}
        >
          Play
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-lg border border-border bg-background px-3 py-2 font-medium hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => controls.pause()}
        >
          Pause
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-lg border border-border bg-background px-3 py-2 font-medium hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => controls.finish()}
        >
          Finish
        </button>
      </div>
      <div className="mt-3 grid gap-2">
        <MotionContainer
          className="rounded-xl border border-border bg-surface-secondary px-3 py-2.5"
          animation={{ mode: "fadeUp", duration: 1.4 }}
          controller={controls}
        >
          01 · Homepage hero
        </MotionContainer>
        <MotionContainer
          className="rounded-xl border border-border bg-surface-secondary px-3 py-2.5"
          animation={{ mode: "slideUp", duration: 2.1 }}
          controller={controls}
        >
          02 · Product announcement
        </MotionContainer>
      </div>
    </section>
  );
}
