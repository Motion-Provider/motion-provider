"use client";

import {
  MotionContainer,
  createMotionConfig,
  createMotionGetter,
  useController,
} from "motion-provider";

const config = createMotionConfig({
  summaryRow: {
    type: "MotionContainer",
    props: { animation: { mode: "fadeUp", duration: 0.4 } },
  },
});

const getAnimation = createMotionGetter(config);

export default function CheckoutSummary() {
  const controls = useController();
  const row = getAnimation("summaryRow");
  return (
    <section
      aria-label="Preview checkout summary"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Checkout
      </p>
      <h3 className="mt-1 text-base font-semibold">Preview checkout summary</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-accent px-3 py-2 font-semibold text-background hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => {
            controls.reset();
            void controls.play();
          }}
        >
          Replay summary
        </button>
      </div>
      <div className="mt-3 grid gap-2">
        <MotionContainer
          {...row}
          controller={controls}
          className="rounded-xl border border-border bg-surface-secondary px-3 py-2.5"
        >
          Delivery · Friday
        </MotionContainer>
        <MotionContainer
          {...row}
          animation={{ ...row.animation, delay: 0.12, duration: 0.65 }}
          controller={controls}
          className="flex justify-between rounded-xl border border-accent/25 bg-accent/10 px-3 py-2.5 font-semibold"
        >
          <span>Total</span>
          <span>€110.70</span>
        </MotionContainer>
      </div>
    </section>
  );
}
