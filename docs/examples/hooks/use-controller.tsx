"use client";

import { MotionContainer, useController } from "motion-provider";

export default function DeploymentPreview() {
  const controller = useController({ stopAnimation: true });

  return (
    <article className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface text-foreground shadow-xl shadow-black/10">
      <header className="flex items-start justify-between gap-4 border-b border-border p-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
            Release preview
          </p>
          <h3 className="mt-1 text-lg font-semibold">Checkout service</h3>
          <p className="mt-1 text-sm text-muted">
            Coordinate the rollout summary from one controller.
          </p>
        </div>

        <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium">
          staging
        </span>
      </header>

      <div className="grid gap-3 p-5">
        <MotionContainer
          animation={{
            mode: ["fadeUp", "filterBlurIn"],
            duration: 0.48,
          }}
          controller={controller}
        >
          <section className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">API rollout</p>
                <p className="mt-1 text-xs text-muted">8 instances · eu-central</p>
              </div>
              <span
                aria-label="Healthy"
                className="size-2.5 rounded-full bg-emerald-500"
                role="img"
              />
            </div>
          </section>
        </MotionContainer>

        <MotionContainer
          animation={{
            mode: ["fadeUp", "scaleZoomIn"],
            duration: 0.56,
            delay: 0.08,
          }}
          controller={controller}
        >
          <section className="rounded-xl border border-border bg-background p-4">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-muted">Changed files</dt>
              <dd className="text-right font-medium">14</dd>
              <dt className="text-muted">Bundle delta</dt>
              <dd className="text-right font-medium">-6.2 kB</dd>
              <dt className="text-muted">Checks</dt>
              <dd className="text-right font-medium">12 / 12</dd>
            </dl>
          </section>
        </MotionContainer>
      </div>

      <footer className="grid grid-cols-2 gap-2 border-t border-border bg-background/60 p-4 sm:grid-cols-4">
        <button
          type="button"
          className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => void controller.play()}
        >
          Replay
        </button>
        <button
          type="button"
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => controller.pause()}
        >
          Pause
        </button>
        <button
          type="button"
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => void controller.reverse()}
        >
          Reverse
        </button>
        <button
          type="button"
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => controller.reset()}
        >
          Reset
        </button>
      </footer>
    </article>
  );
}
