import { Motion } from "motion-provider";
import { slideUp } from "motion-provider/presets";
import type { ModuleProps } from "../../types";

export default function RevealCard({ controller }: ModuleProps) {
  return (
    <Motion
      elementType="article"
      className="max-w-sm rounded-xl border border-accent/20 bg-accent/5 p-5"
      definition={slideUp}
      timing={{ duration: 0.7, easing: "ease-out" }}
      controller={controller}
    >
      <h2 className="font-semibold">Direct animation</h2>
      <p className="mt-1 text-sm text-muted">
        One element, one imported animation module.
      </p>
    </Motion>
  );
}
