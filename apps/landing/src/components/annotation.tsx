import { type AnimationKeys, MotionText } from "motion-provider";
import { cn } from "@/lib/utils";

export function Annotation({
  className,
  title,
  animation,
  textClassName,
  isAnimated = false,
}: {
  className?: string;
  textClassName?: string;
  title: string;
  animation?: AnimationKeys[];
  isAnimated?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute right-1/2 top-full",
        "flex select-none flex-col items-end text-accent mt-2",
        className,
      )}
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
        <title>{title}</title>
        <path d="M10 54C10 34 24 18 40 8" />
        <path d="M27 9L40 8L33 19" />
      </svg>
      {isAnimated ? (
        <MotionText
          animation={{
            mode: animation ?? ["fadeUp", "filterBlurIn"],
            delay: 0.5,
          }}
          elementType="span"
          wrapperClassName={cn("font-annotation", textClassName)}
        >
          {title}
        </MotionText>
      ) : (
        <span className={cn("font-annotation", textClassName)}>{title}</span>
      )}
    </span>
  );
}
