import { Button, Chip } from "@heroui/react";
import { ArrowUpRightIcon, Boxes } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  type ContainerScalesOptions,
  ContainerWrapper,
} from "@/components/container";
import { useIsMobile } from "@/hooks/use-is-mobile";

const GridImage = dynamic(
  () => import("@/components/grid-image").then((mod) => mod.GridImage),
  { ssr: false },
);
export default function CtaSection() {
  return (
    <section
      className="w-full h-[50vh] justify-self-center relative max-w-7xl overflow-visible mb-28 mt-56"
      id="cta-playground"
    >
      <Wrapper>
        <GridImage />
        <div className="grid place-items-center-safe z-50">
          <Chip
            variant="primary"
            className="bg-accent-soft text-accent font-secondary gap-2 rounded-3xl "
          >
            <Boxes className="size-4 text-accent" />
            Rapid Prototyping
          </Chip>
          <div className="md:bg-clip-text md:bg-linear-to-b md:from-foreground md:to-transparent md:from-50%">
            <h1 className="md:text-6xl text-3xl tracking-tighter pt-2 capitalize md:text-transparent text-foreground font-bold text-center">
              Introducing The Motion Playgrounds.
            </h1>
          </div>
          <p className="text-foreground max-w-2xl pt-3 leading-snug tracking-tight text-center md:text-base text-xs text-pretty ">
            <b>Deterministic motion playground</b> to craft and copy-paste
            animations,
            <b>visually</b>. Completely eliminate the need for AI to design your
            motions. Entirely free!
          </p>
          <Link
            href="https://playgrounds.motionprovider.dev"
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="same-origin"
            className="relative"
          >
            <Button variant="primary" size="md" className="mt-4">
              Get me to the Playground <ArrowUpRightIcon className="size-5" />
            </Button>
          </Link>
        </div>
      </Wrapper>
    </section>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  const scales: ContainerScalesOptions = {
    sides: isMobile ? ["bottom", "top"] : ["left", "right", "bottom", "top"],
    className: "pointer-events-none",
    lineWidth: 0.5,
  };

  return (
    <ContainerWrapper<"div">
      as="div"
      width="none"
      radius="3xl"
      surface="glass"
      scales={scales}
      grid={{
        axis: "horizontal",
        lineWidth: 1,
        opacity: 0.5,
        size: 24,
      }}
      className="size-full flex flex-row bg-transparent"
      innerClassName="size-full relative flex md:flex-row flex-col overflow-clip items-center-safe justify-center-safe md:gap-8  bg-transparent"
    >
      {children}
    </ContainerWrapper>
  );
}
