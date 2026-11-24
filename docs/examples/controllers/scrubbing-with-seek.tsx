"use client";

import { MotionContainer, useController } from "motion-provider";

export default function Demo() {
  const controls = useController();
  return (
    <section className="grid gap-3">
      <label>Progress <input type="range" min="0" max="1" step="0.01" defaultValue="0" onChange={(event) => controls.seek(event.currentTarget.valueAsNumber)} /></label>
      <MotionContainer controller={controls} animation={{ mode: "slideUp", duration: 0.8 }}>
        Preview
      </MotionContainer>
    </section>
  );
}
