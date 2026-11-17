import { MotionContainer, useReducedMotion } from "motion-provider";
import type { ModuleProps } from "./types";

const policies = [
  {
    label: "System",
    policy: "user",
    detail: "Follows your device setting",
  },
  {
    label: "Always reduce",
    policy: "always",
    detail: "Shows the final state",
  },
  {
    label: "Always animate",
    policy: "never",
    detail: "Ignores the device setting",
  },
] as const;

export default function ReducedMotionPolicyDemo({
  controller,
}: ModuleProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full max-w-2xl space-y-5">
      <p className="text-sm text-muted" aria-live="polite">
        System preference:{" "}
        <span className="font-medium text-foreground">
          {prefersReducedMotion ? "Reduced motion" : "Full motion"}
        </span>
      </p>

      <div className="grid grid-cols-3 gap-3">
        {policies.map(({ label, policy, detail }) => (
          <div
            key={policy}
            className="min-w-0 rounded-xl border border-border p-3"
          >
            <p className="text-sm font-medium text-foreground">{label}</p>
            <MotionContainer
              animation={{
                mode: ["fadeUp", "filterBlurIn"],
                duration: 0.8,
              }}
              reducedMotion={policy}
              controller={controller}
              className="mt-4 grid min-h-20 place-items-center rounded-lg bg-accent/10 text-sm font-medium text-accent"
            >
              Motion
            </MotionContainer>
            <p className="mt-3 text-xs leading-relaxed text-muted">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
