import { MotionChain } from "motion-provider";
import type { ModuleProps } from "../../types";

const steps = ["Discover", "Design", "Deliver"];

export default function SharedAnimation({ controller }: ModuleProps) {
  return (
    <ul className="grid w-64 gap-2">
      <MotionChain
        elementType="li"
        className="rounded-lg border border-accent/20 bg-accent/10 px-4 py-3 text-sm font-medium text-accent"
        animation={{ mode: ["fadeUp", "filterBlurIn"], duration: 0.5 }}
        config={{ delayLogic: "linear", duration: 0.12 }}
        controller={controller}
      >
        {steps.map((step) => (
          <span key={step}>{step}</span>
        ))}
      </MotionChain>
    </ul>
  );
}
