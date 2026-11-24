import { MotionContainer, useController } from "motion-provider";
import { useState, useSyncExternalStore } from "react";

export default function ControllerHandoff() {
  const [run, setRun] = useState(0);

  return <HandoffPreview key={run} onRestart={() => setRun(run + 1)} />;
}

function HandoffPreview({ onRestart }: { onRestart: () => void }) {
  const controller = useController();
  const command = useSyncExternalStore(
    controller.subscribe,
    controller.getSnapshot,
    controller.getSnapshot,
  );

  return (
    <div className="grid w-full max-w-sm gap-3 rounded-xl border border-border bg-surface p-3 text-sm text-foreground">
      <p aria-live="polite" className="font-medium">
        {command === undefined ? "In-view playback" : "Controller playback"}
      </p>
      <p className="text-xs text-muted">
        Scroll this preview out of view and back to replay it. Use Reverse or
        Play to take over, then Restart demo to restore in-view playback.
      </p>
      <div className="grid min-h-12 place-items-center rounded-lg bg-background">
        <MotionContainer
          animation={{ mode: "fadeUp", duration: 0.6 }}
          controller={{
            configView: { amount: 0.3, once: false },
            controls: controller,
          }}
          className="rounded-md bg-accent px-3 py-1 text-background"
        >
          Deployment ready
        </MotionContainer>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md border border-border px-2 py-1 hover:border-accent"
          onClick={() => void controller.reverse()}
        >
          Reverse
        </button>
        <button
          type="button"
          className="rounded-md border border-border px-2 py-1 hover:border-accent"
          onClick={() => void controller.play()}
        >
          Play
        </button>
        <button
          type="button"
          className="rounded-md border border-border px-2 py-1 hover:border-accent"
          onClick={onRestart}
        >
          Restart demo
        </button>
      </div>
    </div>
  );
}
