import { Annotation } from "../annotation";

export function ShowcaseNoComponent() {
  return (
    <div className="relative flex items-center-safe justify-center-safe flex-col">
      <Annotation
        title="No Preview available check the snippet instead."
        className="z-50 -rotate-180 scale-90 relative"
        textClassName="text-3xl font-bold tracking-normal rotate-180 w-50 pb-2"
      />
    </div>
  );
}
