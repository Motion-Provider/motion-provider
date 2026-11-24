"use client";

import { MotionContainer, createMotionConfig, getAnimation } from "motion-provider";

const config = createMotionConfig({
  notice: { type: "MotionContainer", props: { animation: { mode: "fadeUp" } } },
});

export default function Demo() {
  const props = getAnimation(config, "notice");
  return <MotionContainer {...props}>Notice</MotionContainer>;
}
