import { ContainerWrapper } from "@/components/container";
import { ShowcaseExplorer } from "@/components/showcase/showcase-explorer";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";
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
          radius="none"
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
            <div className="w-7/12 h-full flex">
              <div className="w-7/12 grid place-items-center overflow-hidden relative">
                <ShowcasePreview />
              </div>
              <div className="w-5/12"></div>
            </div>
          </ShowcaseProvider>
        </ContainerWrapper>
      </div>
    </section>
  );
}
