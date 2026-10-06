import { cn } from "@/lib/utils";

export function CountDigit({
  digit,
  className,
  ...props
}: {
  digit: number | string;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-muted font-secondary text-sm tracking-widest",
        className,
      )}
      {...props}
    >
      {digit.toString().padStart(2, "0")}
    </span>
  );
}
