import type { SignalItem } from "@/constants/signal.data";
import { cn } from "@/lib/utils";
import { CountDigit } from "./count-digit";

export function SignalCard({
  className,
  desc,
  title,
  id,
}: { className?: string } & SignalItem) {
  return (
    <div
      className={cn(
        "flex flex-col items-start px-3 relative gap-1.5 pb-1 group *:cursor-default *:pointer-events-none",
        className,
      )}
    >
      <CountDigit digit={id} className="absolute -top-1 right-2.5" />
      <h2 className="sr-only">{title}</h2>
      <span className="relative before:absolute before:-inset-1 before:-skew-y-3 before:bg-accent group-hover:before:bg-accent/10 before:transition-colors before:duration-200">
        <span className="text-xs tracking-wide font-semibold uppercase relative text-black group-hover:text-accent transition-colors">
          {title}
        </span>
      </span>
      <p className="text-xs leading-snug text-muted tracking-tight pt-1">
        {desc}
      </p>
    </div>
  );
}
