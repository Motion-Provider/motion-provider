"use client";

import { MotionContainer } from "motion-provider";
import { useState } from "react";

export default function Demo() {
  const [invalid, setInvalid] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <section>
      <button type="button" onClick={() => setInvalid(true)}>Test invalid threshold</button>
      <MotionContainer animation={{ mode: "fadeUp" }} controller={{ configView: { amount: invalid ? 2 : 0.5 } }} onMotionError={error => setMessage(error.message)}>Preview</MotionContainer>
      <output>{message}</output>
    </section>
  );
}
