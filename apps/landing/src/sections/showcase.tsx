import { ContainerWrapper } from "@/components/container";
import { ShowcaseDivider } from "@/components/showcase/showcase-divider";
import { ShowcaseExplorer } from "@/components/showcase/showcase-explorer";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";
import { ShowcaseSnippet } from "@/components/showcase/showcase-snippet";
import { ShowcaseProvider } from "@/providers/showcase.provider";

export default function ShowcaseSection() {
  return (
    <section className="w-full min-h-screen relative">
      <ShowcaseDivider className="pointer-events-none" />
      <div className="justify-self-center relative max-w-7xl overflow-visible size-full py-28 flex flex-col">
        <div className="flex flex-col gap-3 min-h-min max-h-60 h-auto mb-4 justify-center items-center z-10">
          <h1 className="text-6xl text-black tracking-tighter font-bold">
            Designed For Simplicity.
          </h1>
          <p className="max-w-md leading-snug text-center text-black">
            Here is the core of Motion Provider APIs and literally all
            <span className="text-white"> you need to animate a webpage.</span>
          </p>
        </div>
        <div className="h-[60vh] w-full z-10">
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
            scales={{
              sides: ["left", "right", "bottom"],
              className: "pointer-events-none mt-24",
              offset: 24,
              lineWidth: 0.5,
            }}
            // scales={false}
            className="size-full flex flex-row bg-transparent"
            innerClassName="size-full relative flex overflow-clip items-center-safe justify-center-safe gap-8 bg-transparent"
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
      </div>
    </section>
  );
}
