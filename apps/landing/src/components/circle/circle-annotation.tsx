import { MotionText } from "motion-provider";

export function CircleAnnotation() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-1/2 top-full flex select-none flex-col items-end text-accent mt-2"
    >
      <svg
        viewBox="0 0 60 60"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="-mr-2 size-7 sm:size-9 lg:size-12"
      >
        <title>Try me</title>
        <path d="M10 54C10 34 24 18 40 8" />
        <path d="M27 9L40 8L33 19" />
      </svg>
      <MotionText
        animation={{
          mode: ["fadeUp", "filterBlurIn"],
          delay: 0.5,
        }}
        elementType="span"
        wrapperClassName="font-annotation -mt-1 -rotate-6 whitespace-nowrap text-xl font-bold leading-none sm:text-2xl lg:text-4xl tracking-wider"
      >
        try me
      </MotionText>
    </span>
  );
}
