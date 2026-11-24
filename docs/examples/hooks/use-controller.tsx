import { Pause, Play, Rewind, RotateCcw } from "lucide-react";
import { MotionContainer, useController } from "motion-provider";

export default function DeploymentPreview() {
  const controller = useController({ stopAnimation: true });

  const controls = [
    { label: "Replay", Icon: Play, onClick: () => void controller.play() },
    { label: "Pause", Icon: Pause, onClick: () => controller.pause() },
    {
      label: "Reverse",
      Icon: Rewind,
      onClick: () => void controller.reverse(),
    },
    { label: "Reset", Icon: RotateCcw, onClick: () => controller.reset() },
  ];

  return (
    <article className="grid w-full min-w-0 max-w-md grid-cols-[minmax(0,1fr)_auto] rounded-2xl border border-border bg-surface text-foreground shadow-xl shadow-black/10">
      <div className="grid min-w-0 content-center gap-2 p-2">
        <MotionContainer
          animation={{
            mode: ["fadeUp", "filterBlurIn"],
            duration: 0.48,
          }}
          controller={controller}
        >
          <section>
            <div>
              <p className="text-sm font-semibold">API rollout</p>
              <p className="text-xs text-muted">8 instances · eu-central</p>
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
          <section className="rounded-lg border border-border bg-background px-3 py-2">
            <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-1 text-xs">
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

      <div className="flex flex-col justify-center gap-1 rounded-r-2xl border-l border-border bg-background/60 p-2">
        {controls.map(({ label, Icon, onClick }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            title={label}
            className="grid size-7 place-items-center rounded-md border border-border first:border-accent first:bg-accent first:text-background hover:border-accent hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
            onClick={onClick}
          >
            <Icon aria-hidden="true" className="size-3.5" />
          </button>
        ))}
      </div>
    </article>
  );
}
