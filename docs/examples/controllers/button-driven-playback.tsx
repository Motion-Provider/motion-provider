"use client";

import { MotionContainer, useController } from "motion-provider";

export default function Demo() {
  const controls = useController();
  return (
    <section className="grid gap-3">
      <button type="button" onClick={() => { controls.reset(); void controls.play(); }}>Replay</button>
      <button type="button" onClick={() => controls.pause()}>Pause</button>
      <MotionContainer controller={controls} animation={{ mode: "slideUp", duration: 0.8 }}>
        Preview
      </MotionContainer>
    </section>
  );
}
