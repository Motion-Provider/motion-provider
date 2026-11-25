import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

export default function IntersectionProvider({
  children,
  className,
  fallback,
  options,
}: {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  options?: IntersectionObserverInit;
}) {
  const [ref, entry] = useIntersectionObserver(options);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    if (entry?.isIntersecting) {
      setHasIntersected(true);
    }
  }, [entry?.isIntersecting]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {hasIntersected ? children : fallback}
    </div>
  );
}
