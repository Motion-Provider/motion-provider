import { MotionChain } from "motion-provider";
import { SignalCard } from "@/components/signal-card";
import data from "@/constants/signal.data";
import { getAnimation } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function TrustSignals() {
  return (
    <section
      className={cn(
        "relative mx-auto -mt-8 w-full max-w-7xl",
        "grid grid-cols-2 lg:min-h-18 lg:grid-cols-5 lg:grid-flow-col",
        "overflow-hidden rounded-b-2xl",
      )}
    >
      <div className="absolute inset-0 bg-linear-to-t from-transparent to-background" />
      <MotionChain
        className={cn(
          "border-r border-b py-3 odd:border-r-0",
          "last:col-span-2 last:border-none",
          "lg:border-b-0 lg:py-0 lg:odd:border-r lg:last:col-span-1",
        )}
        {...getAnimation("trustSignals")}
      >
        {data.map((item) => (
          <SignalCard
            className="size-full z-10 hover:bg-surface/50"
            key={item.id}
            {...item}
          />
        ))}
      </MotionChain>
    </section>
  );
}
