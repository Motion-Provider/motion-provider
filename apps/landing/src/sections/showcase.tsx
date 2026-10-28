import { ContainerWrapper } from "@/components/container";
import { ShowcaseExplorer } from "@/components/showcase/showcase-explorer";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";
import { ShowcaseSnippet } from "@/components/showcase/showcase-snippet";
import { ShowcaseProvider } from "@/providers/showcase.provider";

export default function ShowcaseSection() {
  return (
    <section className="w-full h-screen justify-self-center relative max-w-7xl my-28 overflow-visible">
      <div className="flex flex-col gap-3 min-h-min max-h-60 h-auto mb-12 justify-center items-center">
        <h1 className="text-6xl tracking-tighter">Designed For Simplicity.</h1>
        <p className="max-w-md text-muted leading-snug text-center">
          Here is the core of Motion Provider APIs and literally all you need to
          animate a webpage.
        </p>
      </div>
      <div className="max-h-[60vh] size-full">
        <ContainerWrapper<"div">
          as="div"
          width="none"
          radius="3xl"
          surface="glass"
          grid={{
            axis: "horizontal",
            lineWidth: 1,
            opacity: 0.5,
            size: 24,
          }}
          // scales={{
          //   sides: ["bottom"],
          //   className: "pointer-events-none mt-24",
          //   offset: 24,
          //   lineWidth: 0.5,
          // }}
          scales={false}
          className="size-full flex flex-row"
          innerClassName="size-full relative flex overflow-clip items-center-safe justify-center-safe gap-8"
        >
          <ShowcaseProvider>
            <ShowcaseExplorer />
            <div className="w-7/12 h-full relative flex items-center-safe justify-center-safe overflow-hidden rounded-r-3xl">
              <ShowcasePreview />
              <ShowcaseSnippet />
            </div>
          </ShowcaseProvider>
        </ContainerWrapper>
      </div>
    </section>
  );
}
