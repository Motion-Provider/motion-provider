"use client";

import { MotionContainer } from "motion-provider";
import { useState } from "react";

export default function ReleaseHealth() {
  const [threshold, setThreshold] = useState(0.5);
  const [message, setMessage] = useState("");
  return (
    <section
      aria-label="Validate an entrance effect"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Release manager
      </p>
      <h3 className="mt-1 text-base font-semibold">
        Validate an entrance effect
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-accent px-3 py-2 font-semibold text-background hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => setThreshold(2)}
        >
          Test invalid threshold
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-lg border border-border bg-background px-3 py-2 font-medium hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => {
            setMessage("");
            setThreshold(0.5);
          }}
        >
          Restore settings
        </button>
      </div>
      <MotionContainer
        className="mt-3 rounded-lg bg-accent/10 px-3 py-2 font-medium text-accent"
        animation={{ mode: "fadeUp" }}
        controller={{ configView: { amount: threshold } }}
        onMotionError={(error) => setMessage(error.message)}
      >
        Release notes are available
      </MotionContainer>
      <output className="mt-2 block min-h-9 break-words text-xs text-warning">
        {message || "Viewport threshold is valid."}
      </output>
    </section>
  );
}
