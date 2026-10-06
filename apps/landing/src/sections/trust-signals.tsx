import { MotionChain, useAnimation } from "motion-provider";
import { SignalCard } from "@/components/signal-card";
import data from "@/constants/signal.data";
import { cn } from "@/lib/utils";

export default function TrustSignals() {
  return (
    <section
      className={cn(
        "w-full max-w-7xl h-18 relative",
        "justify-self-center grid grid-cols-5 grid-flow-col",
        "overflow-hidden rounded-b-2xl",
      )}
    >
      <div className="absolute top-0 left-0 size-full bg-linear-to-t from-transparent to-background" />
      <MotionChain
        animation={{
          mode: ["fadeDown", "filterBlurIn"],
          transition: "bounceSoft",
          duration: 1.5,
        }}
        controller={{
          configView: {
            amount: 0.5,
          },
        }}
        className="border-r last:border-none"
      >
        {data.map((item) => (
          <SignalCard
            className="size-full border-border-tertiary/50 z-10 hover:bg-surface/50"
            key={item.id}
            {...item}
          />
        ))}
      </MotionChain>
    </section>
  );
}
