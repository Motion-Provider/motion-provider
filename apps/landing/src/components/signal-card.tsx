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
        "flex flex-col items-start justify-start px-3 relative gap-1.5 pb-1 group",
        className,
      )}
    >
      <CountDigit digit={id} className="absolute -top-1 right-2.5" />
      <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-accent group-hover:before:bg-accent/10 before:transition-colors before:duration-200">
        <h3 className="text-xs tracking-wide font-semibold uppercase relative text-black group-hover:text-accent transition-colors">
          {title}
        </h3>
      </span>
      <p className="text-xs leading-snug text-muted tracking-tight pt-1">
        {desc}
      </p>
    </div>
  );
}
