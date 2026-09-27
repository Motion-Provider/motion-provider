"use client";

import { MotionChain, useController } from "motion-provider";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import config from "./config";

const { beginRadius, endRadius, holeRadius } = config;
const { cx, cy, rSub, strokeWidth } = config.identity;

const STAGGER_S = 0.24;
const ENTRY_DURATION_S = 2.5;

function getCircleItems(jobsCount: number) {
  return Array.from({ length: jobsCount }, (_, i) => {
    const t = i / (jobsCount - 1);
    return {
      radius: holeRadius + (beginRadius + t * (endRadius - beginRadius)),
      id: i + 1,
    };
  });
}

const items = getCircleItems(12);

export function Circle() {
  const controls = useController();
  const isReversed = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    for (const t of timers.current) clearTimeout(t);
    timers.current = [];
  }

  function handleClick() {
    clearTimers();

    if (isReversed.current) {
      isReversed.current = false;
      void controls.play();
      return;
    }

    isReversed.current = true;
    // Own reverse() call: reverses in registration order, all at once.
    // Instead, stagger it manually, last-entered first, mirroring the
    // forward delays in reverse rank order — independent of whether the
    // forward cascade has fully settled.
    for (let i = 0; i < items.length; i++) {
      const rank = items.length - 1 - i; // last item reverses first
      timers.current.push(
        setTimeout(() => void controls.reverse(), rank * STAGGER_S * 1000),
      );
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="absolute z-40 pointer-events-auto top-24"
      >
        play
      </button>

      <div
        className="absolute size-lvw flex items-center-safe justify-center-safe pointer-events-none -z-20"
        style={{ perspective: "520px", perspectiveOrigin: "50% 60%" }}
      >
        <div className="inset-0 z-10 absolute size-full bg-linear-to-b from-transparent to-background" />
        <div className="relative size-full flex items-center-safe justify-center-safe transform-[rotateX(36deg)] transform-3d overflow-hidden">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: dynamic svg */}
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="size-full z-30"
          >
            <MotionChain
              animation={{
                mode: ["fadeIn"],
                transition: "bounceSoft",
                duration: ENTRY_DURATION_S,
                fill: "both",
              }}
              config={{ duration: STAGGER_S, delayLogic: "linear" }}
              controller={controls}
              elementType="g"
            >
              {items.map(({ radius, id }) => (
                <circle
                  key={id}
                  cx={cx}
                  cy={cy}
                  r={radius - rSub}
                  className={cn(
                    "z-30",
                    id % 2 === 0 ? "text-accent/25" : "text-accent/50",
                  )}
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={strokeWidth}
                />
              ))}
            </MotionChain>
          </svg>
        </div>
      </div>
    </>
  );
}
