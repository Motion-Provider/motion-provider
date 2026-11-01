import { cn } from "@/lib/utils";

export function ShowcaseDivider({ className }: { className?: string }) {
  return (
    <div className={cn("custom-shape-divider-top-1793568733", className)}>
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <title className="sr-only">Showcase Divider</title>
        <path
          d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
          className="shape-fill"
        ></path>
      </svg>
    </div>
  );
}
