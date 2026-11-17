import { MotionContainer } from "motion-provider";
import type { ModuleProps } from "./types";

const samples = [
  { label: "fadeUp", mode: "fadeUp" },
  {
    label: "scaleZoomIn + filterBlurIn",
    mode: ["scaleZoomIn", "filterBlurIn"],
  },
  { label: "rotateFlipY", mode: "rotateFlipY" },
  { label: "clipCircle", mode: "clipCircle" },
] as const;

export default function ContainerSampler({ controller }: ModuleProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {samples.map(({ label, mode }) => (
        <MotionContainer
          key={label}
          className="grid h-20 w-40 place-items-center rounded-xl bg-accent px-2 text-center text-xs font-medium text-background"
          animation={{ mode, duration: 0.8 }}
          controller={controller}
        >
          {label}
        </MotionContainer>
      ))}
    </div>
  );
}
