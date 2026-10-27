import { Separator } from "@heroui/react";
import { MotionText } from "motion-provider";
import { DxComparisonSplit } from "@/components/comparison/comparison-split";
import { DxComparisonSwitcher } from "@/components/comparison/comparison-switcher";
import { ContainerWrapper } from "@/components/container";
import { DxComparisonProvider } from "@/providers/dx-feature.provider";

export default function DxComparison() {
  return (
    <DxComparisonProvider>
      <section className="w-full h-[70vh] justify-self-center relative max-w-7xl overflow-visible my-28">
        <ContainerWrapper<"section">
          as="section"
          surface="glass"
          width="7xl"
          radius="3xl"
          scales={{
            sides: ["bottom"],
            size: 12,
            thickness: 24,
            lineWidth: 1,
            opacity: 0.8,
            orientation: "vertical",
          }}
          grid={{
            axis: "diagonal",
            size: 8,
            opacity: 0.8,
            lineWidth: 1,
            className: "pointer-events-none",
          }}
          className="max-w-7xl rounded-3xl size-full mt-38"
          innerClassName="relative grid size-full grid-cols-[minmax(0,2fr)_1px_minmax(0,3fr)] grid-rows-1 gap-4 overflow-hidden rounded-3xl p-4"
        >
          <div className="flex min-w-0 flex-col justify-between p-6">
            <div className="flex flex-col gap-3 h-1/3">
              <MotionText
                elementType="h1"
                animation={{
                  mode: ["filterBlurIn", "fadeUp"],
                  transition: "gentle",
                  duration: 0.66,
                }}
                config={{
                  mode: "words",
                  duration: 0.1,
                }}
                controller={{
                  configView: {
                    amount: 1,
                    once: true,
                  },
                }}
                wrapperClassName="text-5xl tracking-tighter"
              >
                In-view, scroll, enter/exit. One API
              </MotionText>
              <p className="max-w-sm text-muted leading-snug tracking-tight">
                Most of us use animation libraries for three things: in-view,
                scroll-based, and enter/exit transitions.
              </p>
              <p className="max-w-sm text-muted leading-snug tracking-tight">
                What if one API covered all of them?
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end items-center size-full">
              <DxComparisonSwitcher className="list-none w-full relative" />
            </div>
          </div>
          <Separator orientation="vertical" className="bg-border my-6" />
          <DxComparisonSplit />
        </ContainerWrapper>
      </section>
    </DxComparisonProvider>
  );
}
