"use client";

import { Motion, useAnimation } from "motion-provider";
import { useState } from "react";

const meter = { initial: { scaleX: 0.35 }, animate: { scaleX: 1 } } as const;

export default function DeliveryOptions() {
  const [express, setExpress] = useState(false);
  const flags = useAnimation({ reverseAnimation: !express });
  return (
    <section
      aria-label="Delivery preferences"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Checkout
      </p>
      <h3 className="mt-1 text-base font-semibold">Delivery preferences</h3>
      <label className="mt-3 flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          className="size-4 accent-accent"
          checked={express}
          onChange={(event) => setExpress(event.currentTarget.checked)}
        />
        Use express delivery
      </label>
      <div
        className="mt-3 grid h-2 overflow-hidden rounded-full bg-border"
        aria-hidden="true"
      >
        <Motion
          className="origin-left rounded-full bg-accent"
          definition={meter}
          timing={{ duration: 0.4 }}
          controller={{ ...flags, trigger: true }}
        />
      </div>
      <p className="mt-1 text-xs text-muted" aria-live="polite">
        {express ? "Tomorrow · €9.00" : "3–5 business days · Free"}
      </p>
    </section>
  );
}
