import { Annotation } from "../annotation";

export function ShowcaseNoComponent() {
  return (
    <div className="relative flex items-center-safe justify-center-safe flex-col mb-12">
      <Annotation
        title="No Preview available check the snippet instead."
        className="z-50 -rotate-180 md:scale-90 relative"
        textClassName="md:text-3xl text-2xl/4 text-balance font-bold tracking-normal rotate-180 w-50 pb-2"
      />
    </div>
  );
}
