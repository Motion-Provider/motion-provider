import { ContainerWrapper } from "@/components/container";
import { cn } from "@/lib/utils";

export default function Showcase() {
  return (
    <section className="w-full h-screen justify-self-center relative max-w-7xl py-28 overflow-visible">
      <div className="flex flex-col gap-3 min-h-min max-h-60 h-auto">
        <h1 className="text-6xl tracking-tighter">Designed For Simplicity.</h1>
        <p className="max-w-md text-muted leading-snug">
          Here is the core of Motion Provider APIs and literally all you need to
          animate a webpage.
        </p>
      </div>
      <div className="pt-18 pb-14 min-h-150 size-full">
        <ContainerWrapper<"div">
          as="div"
          width="none"
          radius="none"
          surface="glass"
          grid={{
            axis: "both",
            size: 100,
            opacity: 1,
            lineWidth: 1,
            className: "pointer-events-none",
          }}
          scales={{
            sides: ["right", "bottom", "left", "top"],
            size: 8,
            thickness: 48,
            opacity: 1,
            orientation: "diagonal",
          }}
          className="size-full flex flex-row"
          innerClassName="size-full relative flex overflow-clip items-center-safe justify-center-safe p-2 gap-2"
        >
          <div
            className={cn(
              "w-5/12 h-full justify-items-center grid grid-cols-3 grid-rows-3",
              "*:even:bg-glass-surface/20 *:even:hover:bg-glass-surface *:odd:bg-background-secondary/20 *:odd:hover:bg-background-secondary",
              "rounded-2xl overflow-hidden",
            )}
          >
            {[...Array(9)].map((_, i) => (
              <div key={i} className="size-full backdrop-blur-xl" />
            ))}
          </div>
          <div className="w-7/12 h-full border flex">
            <div className="w-7/12 border-r"></div>
            <div className="w-5/12"></div>
          </div>
        </ContainerWrapper>
      </div>
    </section>
  );
}
