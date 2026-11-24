"use client";

import { MotionContainer, createMotionConfig, createMotionRegistry } from "motion-provider";

const config = createMotionConfig({
  notice: { type: "MotionContainer", props: { animation: { mode: "fadeUp" } } },
});
const { getAnimation } = createMotionRegistry(config);

export default function Demo() {
  const props = getAnimation("notice");
  return <MotionContainer {...props}>Notice</MotionContainer>;
}
