import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

export default function IntersectionProvider({
  children,
  className,
  options = {
    threshold: 0,
    root: null,
    rootMargin: "0px",
  },
}: {
  children: React.ReactNode;
  className?: string;
  options?: Parameters<typeof useIntersectionObserver>[0];
}) {
  const [ref, entry] = useIntersectionObserver(options);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {entry?.isIntersecting ? children : null}
    </div>
  );
}
