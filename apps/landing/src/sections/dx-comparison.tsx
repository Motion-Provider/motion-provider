import { Separator } from "@heroui/react";
import { MotionText } from "motion-provider";
import { DxComparisonSplit } from "@/components/comparison/comparison-split";
import { DxComparisonSwitcher } from "@/components/comparison/comparison-switcher";
import { ContainerWrapper } from "@/components/container";
import { getAnimation } from "@/lib/motion";
import { DxComparisonProvider } from "@/providers/dx-feature.provider";

const animation = getAnimation("dxComparisonText");

export default function DxComparison() {
  return (
    <DxComparisonProvider>
      <section className="relative mx-auto my-16 w-full max-w-7xl md:px-4 sm:my-20 lg:my-28 lg:h-[70vh] lg:px-0">
        <ContainerWrapper<"div">
          as="div"
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
          className="w-full rounded-3xl lg:mt-38 lg:size-full"
          innerClassName="relative grid w-full overflow-hidden rounded-3xl p-4 sm:p-6 lg:size-full lg:grid-cols-[minmax(0,2fr)_1px_minmax(0,3fr)] lg:grid-rows-1 lg:gap-4 lg:p-4"
        >
          <div className="flex min-w-0 flex-col gap-6 lg:justify-between lg:p-6">
            <div className="flex flex-col gap-3 lg:h-1/3">
              <MotionText
                {...animation}
                wrapperClassName="max-w-lg text-3xl leading-tight tracking-tighter sm:text-4xl lg:text-5xl"
              >
                In-view, scroll, enter/exit. One API
              </MotionText>

              <p className="max-w-sm text-sm leading-snug tracking-tight text-muted sm:text-base">
                Most of us use animation libraries for three things: in-view,
                scroll-based, and enter/exit transitions.
              </p>

              <p className="max-w-sm text-sm leading-snug tracking-tight text-muted sm:text-base">
                What if one API covered all of them?
              </p>
            </div>
            <div className="size-full flex flex-col items-center justify-end gap-2 md:pb-0 pb-12">
              <DxComparisonSwitcher className="w-full list-none relative" />
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="hidden bg-transparent lg:block"
          />

          <div className="min-w-0">
            <DxComparisonSplit />
          </div>
        </ContainerWrapper>
      </section>
    </DxComparisonProvider>
  );
}
