import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}
const Marquee = ({
  className,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: Props) => {
  return (
    <div
      {...props}
      className={cn(
        `group flex overflow-hidden p-2 [--duration:15s] [--gap:1rem] gap-(--gap)`,
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: false positive
          key={i}
          className={cn("flex shrink-0 justify-around gap-(--gap)", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "group-hover:paused": pauseOnHover,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export default Marquee;
