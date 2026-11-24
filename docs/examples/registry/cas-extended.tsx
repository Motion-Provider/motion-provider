"use client";

import { MotionContainer, createMotionConfig, createMotionGetter } from "motion-provider";

const config = createMotionConfig({
  notice: { type: "MotionContainer", props: { animation: { mode: "fadeUp" } } },
});
const getProps = createMotionGetter(config);

export default function Demo() {
  const props = getProps("notice");
  return <MotionContainer {...props} animation={{ ...props.animation, duration: 1 }}>Notice</MotionContainer>;
}
