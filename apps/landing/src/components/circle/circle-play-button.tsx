import { PauseIcon, PlayIcon } from "lucide-react";
import { MotionContainer } from "motion-provider";
import { useEffect, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { useCircle } from "@/providers/circle.provider";

const iconClassName =
  "size-20 stroke-4 -mx-1.25 cursor-pointer group-focus-visible:text-foreground/50 group-hover:text-accent group-hover:-rotate-12 transition-all duration-300";

export function CirclePlayButton() {
  const { controller } = useCircle();
  const animationState = useSyncExternalStore(
    controller.subscribe,
    controller.getSnapshot,
    controller.getSnapshot,
  );

  useEffect(() => {
    if (typeof animationState === "undefined") controller.play();
  }, [animationState, controller]);

  function handleToggle() {
    void controller.onReverse();
  }
  return (
    <button
      onClick={handleToggle}
      type="button"
      className={cn(
        "focus-visible:ring-2 focus-visible:focus-ring rounded-2xl z-50",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-accent",
        "focus-visible:bg-accent/10 group transition-all duration-200",
        "transition-transform active:scale-90",
      )}
    >
      <MotionContainer
        animation={{
          mode: ["fadeIn", "filterBlurIn"],
          delay: 0.2,
          transition: "gentle",
        }}
        key={animationState}
      >
        {animationState === "play" ? (
          <PlayIcon className={iconClassName} />
        ) : (
          <PauseIcon className={cn(iconClassName, "stroke-3")} />
        )}
      </MotionContainer>
    </button>
  );
}
