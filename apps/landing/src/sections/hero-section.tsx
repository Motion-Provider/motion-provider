import { Button, Chip } from "@heroui/react";
import { CopyIcon } from "lucide-react";
import { Circle } from "@/components/circle";
import { CirclePlayButton } from "@/components/circle/circle-play-button";
import { CircleSlider } from "@/components/circle/circle-slider";
import { ContainerWrapper } from "@/components/container";
import { CircleProvider } from "@/providers/circle.provider";

export default function HeroSection() {
  return (
    <ContainerWrapper<"main">
      as="main"
      width="screen"
      radius="none"
      surface="glass"
      grid={{
        axis: "horizontal",
        size: 100,
        opacity: 0.8,
        lineWidth: 1,
        className: "pointer-events-none",
      }}
      scales={{
        sides: ["left", "right", "bottom"],
        size: 8,
        thickness: 48,
        opacity: 0.9,
        orientation: "diagonal",
      }}
      className="lg:w-[calc(100vw-6rem)] h-screen my-16"
      innerClassName="size-full relative flex flex-col items-center-safe justify-center-safe text-center"
    >
      <CircleProvider>
        <Circle />
        <CircleSlider />
        <div className="items-center flex flex-col px-4 relative -mt-16">
          <Chip
            variant="soft"
            color="accent"
            size="sm"
            className="glass border-glass-border mb-6"
          >
            🚀 v1.0 — Preset-driven WAAPI animations
          </Chip>
          <h1 className="max-w-5xl text-balance text-6xl font-bold leading-[0.95] tracking-tighter text-foreground sm:text-7xl lg:text-8xl inline-flex items-center selection:bg-transparent">
            M
            <CirclePlayButton />
            tion Provider
          </h1>
          <p className="mt-4 max-w-155 text-center text-balance tracking-tight text-md text-muted">
            Preset-driven animation engine for the web, powered by the Web
            Animations API.
          </p>
          <Button
            variant="primary"
            className="rounded-full px-6 font-secondary gap-3 mt-4"
          >
            npm i motion-provider <CopyIcon className="size-4" />
          </Button>
        </div>
      </CircleProvider>
    </ContainerWrapper>
  );
}
