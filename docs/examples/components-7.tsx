import { MotionContainer } from "motion-provider";

export default function ControllerView() {
  return (
    <div className="h-48 w-64 overflow-y-auto rounded-xl border border-current/20">
      <p className="p-4 text-center text-xs opacity-70">Scroll down</p>
      <div className="h-52" />
      <MotionContainer
        className="mx-auto size-20 rounded-xl bg-accent"
        animation={{ mode: ["fadeUp", "scaleZoomIn"], duration: 0.5 }}
        controller={{ configView: { amount: 0.6, once: false } }}
      />
      <div className="h-52" />
    </div>
  );
}
