import { MotionText } from "motion-provider";
import {
  type ContainerScalesOptions,
  ContainerWrapper,
} from "@/components/container";
import { ShowcaseExplorer } from "@/components/showcase/showcase-explorer";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";
import { ShowcaseSnippet } from "@/components/showcase/showcase-snippet";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { getAnimation } from "@/lib/motion";
import { ShowcaseProvider } from "@/providers/showcase.provider";

export default function ShowcaseSection() {
  return (
    <section className="w-full min-h-screen relative" id="features">
      <div className="justify-self-center relative max-w-7xl overflow-visible size-full md:py-28 py-14 flex flex-col">
        <div className="flex flex-col gap-3 min-h-min max-h-60 h-auto mb-4 justify-center text-center items-center z-10">
          <Title />
          <p className="md:max-w-md max-w-xs leading-snug text-center text-muted md:pt-0 pt-2">
            Here is the core of Motion Provider APIs and literally all you need
            to animate a webpage.
          </p>
        </div>
        <div className="md:h-[60vh] h-screen w-full z-10">
          <Wrapper>
            <ShowcaseProvider>
              <ShowcaseExplorer />
              <div className="md:w-7/12 w-full h-full relative flex items-center-safe justify-center-safe overflow-hidden rounded-r-3xl">
                <ShowcasePreview />
                <ShowcaseSnippet />
              </div>
            </ShowcaseProvider>
          </Wrapper>
        </div>
      </div>
    </section>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  const scales: ContainerScalesOptions | false = isMobile
    ? false
    : {
        sides: ["left", "right", "bottom"],
        className: "pointer-events-none",
        offset: 24,
        lineWidth: 0.5,
      };

  return (
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
      scales={scales}
      className="size-full flex flex-row bg-transparent"
      innerClassName="size-full relative flex md:flex-row flex-col overflow-clip items-center-safe justify-center-safe md:gap-8  bg-transparent"
    >
      {children}
    </ContainerWrapper>
  );
}

const { animation, config, ...props } = getAnimation("showcaseTitle");

function Title() {
  const isMobile = useIsMobile();

  return (
    <MotionText
      animation={animation}
      config={{
        ...config,
        mode: isMobile ? "words" : "chars",
      }}
      {...props}
    >
      Designed For Simplicity.
    </MotionText>
  );
}
