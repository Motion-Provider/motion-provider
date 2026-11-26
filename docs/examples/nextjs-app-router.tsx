import { MotionContainer, MotionText } from "motion-provider";
import type { ModuleProps } from "./types";

export default function NextAppRouterDemo({ controller }: ModuleProps) {
  return (
    <div className="w-full max-w-xl space-y-5">
      <MotionText
        elementType="h3"
        animation={{
          mode: ["fadeUp", "filterBlurIn"],
          duration: 0.7,
        }}
        controller={controller}
        config={{ mode: "words" }}
        className="text-balance text-2xl font-semibold tracking-tight"
      >
        Server-rendered content, client-side motion.
      </MotionText>

      <MotionContainer
        animation={{
          mode: ["fadeUp", "filterBlurIn"],
          duration: 0.8,
          delay: 0.15,
        }}
        controller={controller}
        className="rounded-xl border border-border bg-accent/10 p-5 text-sm leading-relaxed"
      >
        The component owns its client boundary. Your Server Component can render
        it without becoming a Client Component itself.
      </MotionContainer>
    </div>
  );
}
