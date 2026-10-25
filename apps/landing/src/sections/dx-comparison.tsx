import { Separator } from "@heroui/react";
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
              <h1 className="text-5xl tracking-tighter">
                In-view, scroll, enter/exit. One API
              </h1>
              <p className="max-w-sm text-muted leading-snug tracking-tight">
                Most of us use animation libraries for three things: in-view,
                scroll-based, and enter/exit transitions.
              </p>
              <p className="max-w-sm text-muted leading-snug tracking-tight">
                What if one API covered all of them?
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end items-center size-full">
              <DxComparisonSwitcher />
            </div>
          </div>
          <Separator orientation="vertical" className="bg-border my-6" />
          <DxComparisonSplit />
        </ContainerWrapper>
      </section>
    </DxComparisonProvider>
  );
}
