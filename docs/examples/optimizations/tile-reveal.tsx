"use client";

import { MotionImage, useController } from "motion-provider";

export default function TileReveal() {
  const controls = useController();

  return (
    <figure className="w-full max-w-sm space-y-3 px-3 text-sm text-foreground">
      <MotionImage
        alt="Motion Provider architecture diagram"
        animation={{ mode: "fadeIn", duration: 0.45 }}
        config={{
          img: "/docs/motion-provider-diagram.png",
          pieces: 49,
          duration: 0.012,
        }}
        controller={{ controls, configView: { amount: 0.4 } }}
        wrapperClassName="aspect-video w-full overflow-hidden rounded-xl bg-surface"
      />
      <button
        type="button"
        className="rounded-lg bg-accent px-3 py-2 font-medium text-background"
        onClick={() => {
          controls.reset();
          void controls.play();
        }}
      >
        Replay reveal
      </button>
    </figure>
  );
}
