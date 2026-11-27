import { Skeleton } from "@heroui/react";
import { TEMPLATES } from "../constants/templates.data";

export function PresetsSkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Loading presets…</span>
      <div
        aria-hidden="true"
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
      >
        {TEMPLATES.map(({ id }) => (
          <div key={id} className="mp-glass overflow-hidden rounded-2xl border">
            <div className="motion-safe:animate-pulse">
              <div className="grid h-24 place-items-center border-b border-(--stroke) bg-(--canvas)">
                <Skeleton animationType="none" className="size-12 rounded-xl" />
              </div>
              <div className="grid gap-2 p-4">
                <Skeleton animationType="none" className="h-6 w-1/2" />
                <Skeleton animationType="none" className="h-4 w-full" />
                <Skeleton animationType="none" className="h-4 w-2/3" />
              </div>
              <div className="px-4 pb-4">
                <Skeleton
                  animationType="none"
                  className="h-8 w-24 rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CodePaneSkeleton() {
  return (
    <div
      role="status"
      className="min-h-48 overflow-hidden rounded-3xl border border-(--stroke) bg-(--inset) px-4 py-3"
    >
      <span className="sr-only">Loading code viewer…</span>
      <div aria-hidden="true" className="motion-safe:animate-pulse">
        {["w-2/3", "w-1/3", "w-3/4", "w-1/2", "w-4/5", "w-2/5", "w-1/4"].map(
          (width) => (
            <div key={width} className="flex h-6 items-center gap-4">
              <Skeleton animationType="none" className="h-3 w-5 shrink-0" />
              <Skeleton animationType="none" className={`h-3 ${width}`} />
            </div>
          ),
        )}
      </div>
    </div>
  );
}
