"use client";

import { MotionContainer, createMotionConfig, createMotionRegistry } from "motion-provider";

const config = createMotionConfig({
  notice: { type: "MotionContainer", props: { animation: { mode: "fadeUp" } } },
});
const registry = createMotionRegistry(config);

export default function Demo() {
  const props = registry.getAnimation("notice");
  return <MotionContainer {...props}>Notice</MotionContainer>;
}
