import { MotionChain } from "motion-provider";
import type { ModuleProps } from "./types";

const steps = ["Design", "Build", "Ship"];

export default function ChainStagger({ controller }: ModuleProps) {
  return (
    <ul className="grid w-64 gap-2">
      <MotionChain
        elementType="li"
        className="rounded-lg bg-accent/20 px-4 py-2 text-sm font-medium border border-accent/20"
        animation={{ mode: ["fadeUp", "filterBlurIn"], duration: 0.5 }}
        config={{ delayLogic: "linear", duration: 0.12 }}
        controller={controller}
      >
        {steps.map((step) => (
          <span key={step} className="text-accent">
            {step}
          </span>
        ))}
      </MotionChain>
    </ul>
  );
}
