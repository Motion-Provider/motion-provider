import { MotionChain } from "motion-provider";
import type { ModuleProps } from "../../types";

const stages = [
  { id: "plan", label: "Plan" },
  { id: "build", label: "Build" },
  { id: "ship", label: "Ship" },
];

export default function PerItemAnimations({ controller }: ModuleProps) {
  return (
    <ol className="grid w-64 gap-2">
      <MotionChain
        elementType="li"
        className="rounded-lg border border-accent/20 bg-accent/10 px-4 py-3 text-sm font-medium text-accent"
        animations={[
          { mode: "fadeUp", duration: 0.5 },
          { mode: ["scaleZoomIn", "filterBlurIn"], duration: 0.65 },
          { mode: "slideUp", duration: 0.5, delay: 0.08 },
        ]}
        config={{ delayLogic: "wave", duration: 0.14 }}
        controller={controller}
      >
        {stages.map((stage) => (
          <span key={stage.id}>{stage.label}</span>
        ))}
      </MotionChain>
    </ol>
  );
}
