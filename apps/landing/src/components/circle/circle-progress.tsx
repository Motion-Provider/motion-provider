import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { useCircle } from "@/providers/circle.provider";

const STROKE = 19;
const SIZE = 100;
const RADIUS = (SIZE - STROKE) / 2;

export function CircleProgress({ className }: { className?: string }) {
  const { progress } = useCircle();
  const value = useSyncExternalStore(
    progress.subscribe,
    progress.getSnapshot,
    progress.getServerSnapshot,
  );

  const clamped = Math.min(1, Math.max(0, value));

  return (
    <>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        fill="none"
        className={cn(
          "ml-[0.04em] inline-block size-[0.60em] mt-2 shrink-0 -rotate-90 text-foreground",
          className,
        )}
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="currentColor"
          strokeOpacity={0.15}
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="butt"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100 - clamped * 100}
        />
      </svg>
      <span className="sr-only">o</span>
    </>
  );
}
