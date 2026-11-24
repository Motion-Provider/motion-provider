"use client";

import { MotionContainer, createMotionConfig } from "motion-provider";

const config = createMotionConfig({
  notice: { type: "MotionContainer", props: { animation: { mode: "fadeUp" } } },
});

export default function Demo() {
  const props = config.notice.props;
  return <MotionContainer {...props}>Notice</MotionContainer>;
}
