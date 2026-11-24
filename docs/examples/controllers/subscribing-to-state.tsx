"use client";

import { MotionContainer, useController } from "motion-provider";
import { useSyncExternalStore } from "react";

export default function PlaybackInspector() {
  const controls = useController();
  const command = useSyncExternalStore(
    controls.subscribe,
    controls.getSnapshot,
    () => undefined,
  );
  return (
    <section
      aria-label="Inspect playback commands"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Prototype
      </p>
      <h3 className="mt-1 text-base font-semibold">
        Inspect playback commands
      </h3>
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
          onClick={() => controls.reset()}
        >
          Reset
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-border bg-surface-secondary px-3 py-2.5">
        <span>Last command</span>
        <output className="rounded-full bg-accent/10 px-2 py-1 font-secondary text-xs text-accent">
          {command ?? "ready"}
        </output>
      </div>
      <div className="mt-2 overflow-hidden">
        <MotionContainer
          className="rounded-xl border border-border bg-surface-secondary px-3 py-2.5"
          animation={{ mode: "slideUp", duration: 1.4 }}
          controller={controls}
        >
          New message · Design review
        </MotionContainer>
      </div>
    </section>
  );
}
