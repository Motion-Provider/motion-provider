"use client";

import {
  MotionContainer,
  createMotionConfig,
  createMotionRegistry,
} from "motion-provider";

const config = createMotionConfig({
  activityCard: {
    type: "MotionContainer",
    props: { animation: { mode: "fadeUp", duration: 0.55 } },
  },
});

const { getAnimation } = createMotionRegistry(config);

export default function ActivitySummary() {
  return (
    <section
      aria-label="Activity summary"
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-lg shadow-black/20"
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        Workspace
      </p>
      <h3 className="mt-1 text-base font-semibold">Activity summary</h3>
      <p className="mt-1 text-xs text-muted">
        New activity cards share one entrance definition.
      </p>
      <div className="mt-3 grid gap-2">
        <MotionContainer
          {...getAnimation("activityCard")}
          className="rounded-xl border border-border bg-surface-secondary px-3 py-2.5"
        >
          <p className="font-medium">Design review</p>
          <p className="mt-1 text-xs text-muted">4 comments · Today</p>
        </MotionContainer>
        <MotionContainer
          {...getAnimation("activityCard")}
          className="rounded-xl border border-border bg-surface-secondary px-3 py-2.5"
        >
          <p className="font-medium">Sprint planning</p>
          <p className="mt-1 text-xs text-muted">2 updates · Yesterday</p>
        </MotionContainer>
      </div>
    </section>
  );
}
