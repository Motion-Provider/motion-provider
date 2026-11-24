"use client";

import { MotionContainer, useController } from "motion-provider";
import { useSyncExternalStore } from "react";

export default function Demo() {
  const controls = useController();
  const command = useSyncExternalStore(controls.subscribe, controls.getSnapshot, () => undefined);
  return (
    <section className="grid gap-3">
      <button type="button" onClick={() => controls.play()}>Play</button>
      <button type="button" onClick={() => controls.pause()}>Pause</button>
      <output>{command ?? "Ready"}</output>
      <MotionContainer controller={controls} animation={{ mode: "slideUp", duration: 0.8 }}>
        Preview
      </MotionContainer>
    </section>
  );
}
