import { Separator, Tabs } from "@heroui/react";
import { ContainerWrapper } from "@/components/container";

export default function DxComparison() {
  return (
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
              Developer Ergonomic DX.
            </h1>
            <p className="max-w-sm text-muted leading-snug tracking-tight">
              Almost ~80% of us are using animations libraries solely for basic
              APIs: in-view, scroll-based and simple enter/exit transitions.
            </p>
            <p className="max-w-sm text-muted leading-snug tracking-tight">
              What if I told you all these are now under one API?
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-end items-center size-full">
            {Array.from({ length: 4 }).map((_, idx) => (
              <button
                type="button"
                className="laptop:h-12 desktop:h-18 w-full rounded-3xl bg-mist-400"
                key={idx}
              />
            ))}
          </div>
        </div>
        <Separator orientation="vertical" className="bg-border my-6" />
        <Tabs className="size-full flex p-6" variant="secondary">
          <Tabs.ListContainer>
            <Tabs.List aria-label="Options">
              <Tabs.Tab id="overview">
                Overview
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="analytics">
                Analytics
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="reports">
                Reports
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
          <Tabs.Panel
            className="pt-4 size-full bg-accent-foreground flex"
            id="overview"
          >
            <div className="size-full bg-amber-300">a</div>
            <div className="size-full bg-amber-600">b</div>
          </Tabs.Panel>
          {/* <Tabs.Panel className="pt-4" id="analytics">
              <p>Track your metrics and analyze performance data.</p>
            </Tabs.Panel>
            <Tabs.Panel className="pt-4" id="reports">
              <p>Generate and download detailed reports.</p>
            </Tabs.Panel> */}
        </Tabs>
      </ContainerWrapper>
    </section>
  );
}
