"use client";

import {
  MotionContainer,
  createMotionConfig,
  createMotionRegistry,
} from "motion-provider";

const billing = createMotionRegistry(
  createMotionConfig({
    reminder: {
      type: "MotionContainer",
      props: { animation: { mode: "fadeUp", duration: 0.5 } },
    },
    overdue: {
      type: "MotionContainer",
      props: { animation: { mode: "slideUp", duration: 0.7 } },
    },
  }),
);

export default function BillingReminders() {
  return (
    <section
      aria-label="Invoice reminders"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Accounts
      </p>
      <h3 className="mt-1 text-base font-semibold">Invoice reminders</h3>
      <p className="mt-1 text-xs text-muted">
        Choose an entrance by invoice state.
      </p>
      <div className="mt-3 grid gap-2">
        <MotionContainer
          {...billing.getAnimation("reminder")}
          className="rounded-xl border border-border bg-surface-secondary px-3 py-2.5"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium">Invoice #1042</p>
            <span className="font-secondary text-xs">€110.70</span>
          </div>
          <p className="mt-1 text-xs text-muted">Due this Friday</p>
        </MotionContainer>
        <MotionContainer
          {...billing.getAnimation("overdue")}
          className="rounded-xl border border-border bg-surface-secondary px-3 py-2.5"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium">Invoice #1036</p>
            <span className="font-secondary text-xs">€84.00</span>
          </div>
          <p className="mt-1 text-xs text-warning">Overdue · 3 days</p>
        </MotionContainer>
      </div>
    </section>
  );
}
