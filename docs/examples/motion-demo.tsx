import { MotionContainer } from "motion-provider";

interface MotionDemoProps {
  label: string;
}

export function MotionDemo({ label }: MotionDemoProps) {
  return (
    <figure className="not-prose my-6 flex items-center gap-4 rounded-lg border border-border bg-surface p-6">
      <MotionContainer
        animation={{ mode: ["fadeIn", "filterBlurIn"] }}
        className="size-16 rounded-full bg-accent"
      />
      <figcaption className="text-sm text-muted">{label}</figcaption>
    </figure>
  );
}
