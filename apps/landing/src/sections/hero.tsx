import { Button, Chip, Skeleton } from "@heroui/react";
import { CopyIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { Annotation } from "@/components/annotation";
import { Circle } from "@/components/circle";
import { CircleList } from "@/components/circle/circle-list";
import { CirclePlayButton } from "@/components/circle/circle-play-button";
import { CircleProgress } from "@/components/circle/circle-progress";
import { CircleSlider } from "@/components/circle/circle-slider";
import { ContainerWrapper } from "@/components/container";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/lib/utils";
import { CircleProvider } from "@/providers/circle.provider";

const CircleCodeSnippet = dynamic(
  () =>
    import("@/components/circle/circle-code-snippet").then(
      ({ CircleCodeSnippet }) => CircleCodeSnippet,
    ),
  {
    ssr: false,
    loading: () => (
      <Skeleton
        aria-hidden="true"
        className="pointer-events-none absolute left-24 top-16 z-50 hidden h-[calc(16lh+1.75rem)] w-md rounded-3xl bg-glass-surface text-xs xl:block"
      />
    ),
  },
);

export default function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <div className="relative grid min-h-svh w-full place-items-center overflow-x-clip">
      <ContainerWrapper<"main">
        as="main"
        radius="none"
        grid={{
          axis: "horizontal",
          size: 100,
          opacity: 0.8,
          lineWidth: 1,
          className: "pointer-events-none",
        }}
        scales={false}
        className="min-h-svh lg:h-screen lg:w-[calc(100vw-6rem)]"
        innerClassName="relative z-20 flex min-h-svh w-full flex-col items-center justify-center pt-16 text-center sm:pt-20 lg:mt-16 lg:h-full lg:pt-0"
      >
        <CircleProvider>
          <Circle />

          {!isMobile && (
            <CircleCodeSnippet className="absolute left-24 top-16 z-50 hidden xl:block" />
          )}

          <div className="absolute md:right-16 right-8 md:top-12 top-16 gap-8 xl:flex">
            {!isMobile && <CircleList className="z-50" />}
            <CircleSlider className="perspective-distant md:scale-100 scale-90" />
          </div>

          <div className="relative z-50 -mt-8 flex w-full max-w-5xl flex-col items-center px-4 sm:-mt-12 lg:-mt-16">
            <Annotation
              title="Try it"
              className="absolute left-8 top-0 -translate-y-1/2 flex-col-reverse rotate-6 sm:left-[22%] xl:hidden [&>svg]:scale-y-[-1]"
              textClassName="font-annotation whitespace-nowrap text-base font-bold leading-none tracking-wider text-xl"
            />

            <Chip
              variant="soft"
              color="accent"
              size="sm"
              className="glass mb-4 rounded-3xl border-glass-border px-1 py-0.5 sm:mb-6"
            >
              🚀 v1.0 • WAAPI animations
            </Chip>

            <h1
              className={cn(
                "flex w-full flex-wrap items-center justify-center gap-x-[0.22em]",
                "text-balance text-4xl font-bold leading-[0.95] tracking-tighter",
                "text-foreground selection:bg-transparent text-7xl lg:text-8xl",
              )}
            >
              <span className="inline-flex shrink-0 items-center">
                M
                <span className="relative inline-flex items-center">
                  <CirclePlayButton />

                  <Annotation
                    title="Try it"
                    className="absolute right-1/2 top-full z-50 mt-0 hidden translate-y-5 -translate-x-2 -rotate-12 xl:flex"
                    textClassName="font-annotation -mt-1 whitespace-nowrap text-xl font-bold leading-none tracking-wider "
                  />
                </span>
                tion
              </span>

              <span className="inline-flex shrink-0 items-center">
                Pr
                <CircleProgress className="shrink-0" />
                vider
              </span>
            </h1>

            <p className="mt-3 w-full max-w-md text-center text-pretty text-base md:leading-6 leading-none tracking-tight text-muted sm:mt-4 sm:text-lg">
              Preset-driven animation engine for the web and React, powered by
              the Web Animations API.
            </p>

            <Button
              variant="primary"
              className="mt-4 max-w-full gap-3 rounded-full px-5 font-secondary sm:px-6"
            >
              npm i motion-provider <CopyIcon className="size-4" />
            </Button>
          </div>
        </CircleProvider>
      </ContainerWrapper>
    </div>
  );
}
