"use client";

import { MotionContainer, useController } from "motion-provider";

export default function ShortcutPreview() {
  const controls = useController();
  return (
    <section
      aria-label="Quick actions"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Product tour
      </p>
      <h3 className="mt-1 text-base font-semibold">Quick actions</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-accent px-3 py-2 font-semibold text-background hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => void controls.play()}
        >
          Show shortcuts
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-lg border border-border bg-background px-3 py-2 font-medium hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => void controls.onReverse()}
        >
          Toggle direction
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-lg border border-border bg-background px-3 py-2 font-medium hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => controls.onStop()}
        >
          Finish
        </button>
      </div>
      <div className="mt-3 overflow-hidden">
        <MotionContainer
          className="rounded-xl border border-border bg-surface-secondary px-3 py-2.5"
          animation={{ mode: "slideUp", duration: 1.2 }}
          controller={controls}
        >
          <div className="flex justify-between gap-2">
            <span>Search workspace</span>
            <kbd className="rounded border border-border px-2 font-secondary text-xs">
              Ctrl K
            </kbd>
          </div>
        </MotionContainer>
      </div>
    </section>
  );
}
