"use client";

import {
  MotionContainer,
  createMotionConfig,
  getAnimation,
} from "motion-provider";

const config = createMotionConfig({
  shippingNotice: {
    type: "MotionContainer",
    props: { animation: { mode: "fadeUp", duration: 0.6 } },
  },
});

export default function ShippingNotice() {
  return (
    <section
      aria-label="Shipping status"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Storefront
      </p>
      <h3 className="mt-1 text-base font-semibold">Shipping status</h3>
      <p className="mt-1 text-xs text-muted">
        The shipping summary uses a one-off lookup.
      </p>
      <div className="mt-3 grid gap-2">
        <MotionContainer
          {...getAnimation(config, "shippingNotice")}
          className="rounded-xl border border-border bg-surface-secondary px-3 py-2.5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium">Order dispatched</p>
            <span className="rounded-full bg-success/10 px-2 py-1 text-xs text-success">
              In transit
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">Tracking number · PL-0281</p>
        </MotionContainer>
      </div>
    </section>
  );
}
