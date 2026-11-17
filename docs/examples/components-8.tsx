import { MotionContainer } from "motion-provider";
import { useState } from "react";

export default function ControllerScroll() {
  const [source, setSource] = useState<HTMLDivElement | null>(null);

  return (
    <div
      ref={setSource}
      className="h-48 w-64 overflow-y-auto rounded-xl border border-current/20"
    >
      <p className="p-4 text-center text-xs opacity-70">
        Scrub with the scrollbar
      </p>
      <div className="h-52" />
      <MotionContainer
        className="mx-auto size-20 rounded-xl bg-accent"
        animation={{ mode: ["fadeUp", "rotateIn"], duration: 1 }}
        controller={{ scroll: { source, end: 0.6 } }}
      />
      <div className="h-52" />
    </div>
  );
}
