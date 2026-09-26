import { ContainerWrapper } from "@/components/container";
import { fontPrimary, fontSecondary } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import HeroSection from "@/sections/hero-section";

export default function Home() {
  return (
    <ContainerWrapper
      as="div"
      width="screen"
      radius="none"
      surface="glass"
      frame={{
        sides: ["bottom", "left", "right", "top"],
      }}
      grid={{
        axis: "horizontal",
        size: 132,
        opacity: 0.8,
        lineWidth: 1,
        className: "pointer-events-none",
      }}
      scales={{
        sides: ["left", "right"],
        size: 8,
        thickness: 48,
        opacity: 0.9,
        orientation: "diagonal",
      }}
      className={cn(
        fontPrimary.variable,
        fontSecondary.variable,
        "font-primary mx-auto w-360",
      )}
      innerClassName="relative grid min-h-dvh w-full min-w-0 place-items-center"
    >
      <HeroSection />
    </ContainerWrapper>
  );
}
