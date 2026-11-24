"use client";

import { MotionContainer, useController } from "motion-provider";

export default function Demo() {
  const controls = useController();
  return (
    <section className="grid gap-3">
      <button type="button" onClick={() => controls.play()}>Play</button>
      <button type="button" onClick={() => controls.reverse()}>Reverse</button>
      <MotionContainer controller={controls} animation={{ mode: "slideUp", duration: 0.8 }}>
        Preview
      </MotionContainer>
    </section>
  );
}
