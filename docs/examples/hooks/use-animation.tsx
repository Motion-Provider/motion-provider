"use client";

import { MotionContainer, useAnimation } from "motion-provider";
import { useState } from "react";

export default function Demo() {
  const [backward, setBackward] = useState(false);
  const flags = useAnimation({ reverseAnimation: backward });
  return (
    <section>
      <label><input type="checkbox" checked={backward} onChange={e => setBackward(e.target.checked)} /> Reverse</label>
      <MotionContainer controller={{ ...flags, trigger: true }} animation={{ mode: "slideUp" }}>Preview</MotionContainer>
    </section>
  );
}
