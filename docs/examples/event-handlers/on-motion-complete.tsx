"use client";

import { MotionContainer } from "motion-provider";
import { useState } from "react";

export default function Demo() {
  const [status, setStatus] = useState("Waiting");
  return (
    <section>
      <MotionContainer animation={{ mode: "fadeUp" }} onMotionComplete={result => setStatus(result.status)}>Preview</MotionContainer>
      <output>{status}</output>
    </section>
  );
}
