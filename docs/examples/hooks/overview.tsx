"use client";

import { MotionContainer, useController } from "motion-provider";
import { useState } from "react";

export default function SaveConfirmation() {
  const controls = useController();
  const [saved, setSaved] = useState(false);
  return (
    <section
      aria-label="Profile settings"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Workspace
      </p>
      <h3 className="mt-1 text-base font-semibold">Profile settings</h3>
      <p className="mt-1 text-xs text-muted">
        Email digests are delivered every Monday.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-accent px-3 py-2 font-semibold text-background hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => {
            setSaved(true);
            controls.reset();
            void controls.play();
          }}
        >
          Save preferences
        </button>
      </div>
      <div className="mt-3 min-h-11" aria-live="polite">
        {saved && (
          <MotionContainer
            className="rounded-lg bg-success/10 px-3 py-2 font-medium text-success"
            animation={{ mode: "fadeUp", duration: 0.5 }}
            controller={controls}
          >
            Preferences saved.
          </MotionContainer>
        )}
      </div>
    </section>
  );
}
