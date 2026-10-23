import { ContainerWrapper } from "@/components/container";
import { ShowcaseExplorer } from "@/components/showcase/showcase-explorer";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";
import { ShowcaseSnippet } from "@/components/showcase/showcase-snippet";
import { ShowcaseProvider } from "@/providers/showcase.provider";

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
          radius="3xl"
          surface="glass"
          scales={{
            sides: ["right", "bottom", "left", "top"],
            size: 8,
            thickness: 48,
            opacity: 1,
            orientation: "diagonal",
          }}
          className="size-full flex flex-row"
          innerClassName="size-full relative flex overflow-clip items-center-safe justify-center-safe"
        >
          <ShowcaseProvider>
            <ShowcaseExplorer />
            <ContainerWrapper<"div">
              as="div"
              width="lg"
              grid={{
                axis: "both",
                lineWidth: 1,
                opacity: 0.5,
                size: 24,
              }}
              scales={false}
              className="w-7/12 h-full flex"
              innerClassName="size-full flex items-center-safe justify-center-safe overflow-hidden rounded-r-3xl"
            >
              <ShowcasePreview />
              <ShowcaseSnippet />
            </ContainerWrapper>
          </ShowcaseProvider>
        </ContainerWrapper>
      </div>
    </section>
  );
}
