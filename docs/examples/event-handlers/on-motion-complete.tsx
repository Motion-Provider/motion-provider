"use client";

import { MotionContainer, useController } from "motion-provider";
import { useState } from "react";

export default function InvoiceApproval() {
  const controls = useController();
  const [status, setStatus] = useState("Awaiting approval");
  return (
    <section
      aria-label="Approve invoice"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Billing
      </p>
      <h3 className="mt-1 text-base font-semibold">Approve invoice</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-accent px-3 py-2 font-semibold text-background hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => {
            controls.reset();
            setStatus("Approving…");
            void controls.play();
          }}
        >
          Approve invoice
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-lg border border-border bg-background px-3 py-2 font-medium hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => controls.cancel()}
        >
          Cancel preview
        </button>
      </div>
      <div className="mt-3 overflow-hidden rounded-xl border border-border bg-surface-secondary px-3 py-2.5">
        <MotionContainer
          animation={{ mode: "fadeUp", duration: 1.2 }}
          controller={controls}
          onMotionComplete={({ status }) =>
            setStatus(
              status === "finished"
                ? "Invoice approved"
                : "Approval preview cancelled",
            )
          }
        >
          <span className="font-medium text-success">
            Invoice #1042 · €110.70
          </span>
        </MotionContainer>
      </div>
      <output className="mt-2 block min-h-5 text-xs text-muted">
        {status}
      </output>
    </section>
  );
}
