import { Label, Slider } from "@heroui/react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { useCircle } from "@/providers/circle.provider";

export function CircleSlider({ className }: { className?: string }) {
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
    <div
      className={cn(
        "flex h-64 items-center justify-center absolute top-8 right-8 font-secondary",
        className,
      )}
    >
      <Slider
        className="h-full"
        value={Math.round(value * 100)}
        onChange={handleSeekChange}
        orientation="vertical"
        minValue={0}
        maxValue={100}
        step={1}
      >
        <Label className="text-muted">Seek</Label>
        <Slider.Output className="text-muted" />
        <Slider.Track className="bg-glass-surface">
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
    </div>
  );
}
