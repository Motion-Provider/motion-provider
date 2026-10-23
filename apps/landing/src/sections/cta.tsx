import { Button, Chip } from "@heroui/react";
import { ArrowUpRightIcon, Boxes } from "lucide-react";
import Link from "next/link";
import { ContainerWrapper, Scales } from "@/components/container";
import SquareGrid from "@/components/square-grid";

export default function Cta() {
  return (
    <ContainerWrapper<"section">
      as="section"
      className="lg:w-[calc(100vw-6rem)] h-auto mb-24"
      scales={{
        sides: ["top", "bottom"],
        size: 12,
        thickness: 48,
        opacity: 1,
        orientation: "diagonal",
      }}
    >
      <div className="w-full max-w-7xl relative h-fit grid place-items-center-safe text-center justify-self-center py-36 rounded-3xl overflow-hidden">
        <SquareGrid />
        <Scales
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-muted -z-10 rounded-3xl"
          opacity={0.5}
        />
        <div className="grid place-items-center-safe z-50">
          <Chip
            variant="primary"
            className="bg-accent-soft text-accent font-secondary gap-2 rounded-3xl "
          >
            <Boxes className="size-4 text-accent" />
            Rapid Prototyping
          </Chip>
          <div className="bg-clip-text bg-linear-to-b from-foreground to-transparent from-50%">
            <h1 className="md:text-6xl tracking-tighter pt-2 capitalize text-transparent">
              Introducing The Motion Playgrounds.
            </h1>
          </div>
          <p className="text-foreground max-w-2xl pt-3 leading-snug tracking-tight">
            <b>Deterministic motion playground</b> to craft and copy-paste
            animations,
            <b>visually</b>. Completely eliminate the need for AI to design your
            motions. Entirely free!
          </p>{" "}
          <Link
            href="https://playgrounds.motionprovider.dev"
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="same-origin"
            className="relative"
          >
            <Button variant="primary" size="lg" className="mt-4">
              Get to the Playground <ArrowUpRightIcon className="size-5" />
            </Button>
          </Link>
        </div>
      </div>
    </ContainerWrapper>
  );
}
