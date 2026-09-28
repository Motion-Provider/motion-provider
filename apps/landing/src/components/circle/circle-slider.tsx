// components/circle-slider.tsx
"use client";

import { Label, Slider } from "@heroui/react";
import { useSyncExternalStore } from "react";
import { useCircle } from "@/providers/circle.provider";

export function CircleSlider() {
  const { controller, progress } = useCircle();

  const value = useSyncExternalStore(
    progress.subscribe,
    progress.getSnapshot,
    progress.getServerSnapshot,
  );

  function handleSeekChange(next: number | number[] | undefined) {
    const eventValue = Array.isArray(next) ? next[0] : next;
    if (typeof eventValue !== "undefined") controller.seek(eventValue / 100);
  }

  return (
    <div className="flex h-64 items-center justify-center absolute top-24 right-24 font-secondary">
      <Slider
        className="h-full"
        value={Math.round(value * 100)}
        onChange={handleSeekChange}
        orientation="vertical"
        minValue={0}
        maxValue={100}
        step={1}
      >
        <Label>Seek</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
    </div>
  );
}
