"use client";

import { MotionContainer, useController } from "motion-provider";

export default function InvoiceDetails() {
  const controls = useController();
  return (
    <section
      aria-label="Invoice #1042"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Billing
      </p>
      <h3 className="mt-1 text-base font-semibold">Invoice #1042</h3>
      <p className="mt-1 text-xs text-muted">Total due · €110.70</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-accent px-3 py-2 font-semibold text-background hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => void controls.play()}
        >
          Show breakdown
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-lg border border-border bg-background px-3 py-2 font-medium hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => void controls.reverse()}
        >
          Hide breakdown
        </button>
      </div>
      <div className="mt-3 overflow-hidden">
        <MotionContainer
          className="rounded-xl border border-border bg-surface-secondary px-3 py-2.5"
          animation={{ mode: "fadeUp", duration: 0.5 }}
          controller={controls}
        >
          <dl className="grid grid-cols-2 gap-1">
            <dt>Subtotal</dt>
            <dd className="text-right">€90.00</dd>
            <dt>Tax</dt>
            <dd className="text-right">€20.70</dd>
          </dl>
        </MotionContainer>
      </div>
    </section>
  );
}
