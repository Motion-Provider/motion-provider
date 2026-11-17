import { Motion } from "motion-provider";
import { heartbeat, slideUp } from "motion-provider/presets";
import type { ModuleProps } from "./types";

export default function MotionDirect({ controller }: ModuleProps) {
  return (
    <div className="flex items-end gap-6">
      <Motion
        className="size-16 rounded-xl bg-accent"
        definition={slideUp}
        timing={{ duration: 0.7, easing: "backOut" }}
        controller={controller}
      />
      <Motion
        className="size-16 rounded-full bg-accent"
        definition={heartbeat}
        timing={{ duration: 0.8, iterations: 3 }}
        controller={controller}
      />
    </div>
  );
}
