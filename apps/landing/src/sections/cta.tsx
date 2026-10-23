import { Button, Chip } from "@heroui/react";
import { ArrowUpRightIcon, Boxes } from "lucide-react";
import Link from "next/link";
import { ContainerWrapper } from "@/components/container";
import SquareGrid from "@/components/square-grid";

export default function Cta() {
  return (
    <section className="w-full h-[50vh] justify-self-center relative max-w-7xl overflow-visible mb-28">
      <ContainerWrapper<"section">
        as="section"
        surface="glass"
        width="7xl"
        scales={{
          sides: ["top", "bottom", "left", "right"],
          size: 12,
          thickness: 24,
          opacity: 1,
          orientation: "vertical",
        }}
        grid={{
          axis: "diagonal",
          size: 100,
          opacity: 0.8,
          lineWidth: 1,
          className: "pointer-events-none",
        }}
        className="max-w-7xl rounded-3xl size-full"
        innerClassName="grid place-items-center-safe relative overflow-hidden size-full rounded-3xl"
      >
        <SquareGrid />
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
              Get me to the Playground <ArrowUpRightIcon className="size-5" />
            </Button>
          </Link>
        </div>
      </ContainerWrapper>
    </section>
  );
}
