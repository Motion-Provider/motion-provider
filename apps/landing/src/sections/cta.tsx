import { Chip } from "@heroui/react";
import { DollarSignIcon } from "lucide-react";
import { Scales } from "@/components/container";
import SquareGrid from "@/components/square-grid";

export default function Cta() {
  return (
    <section className="w-full h-48 mb-60">
      <div className="w-full max-w-7xl relative h-fit grid place-items-center-safe text-center justify-self-center py-36 rounded-3xl overflow-hidden border border-border">
        <SquareGrid />
        <Scales
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-muted -z-10"
          opacity={0.5}
        />
        <div className="grid place-items-center-safe z-50">
          <Chip
            variant="primary"
            className="bg-accent-soft text-accent font-secondary gap-1"
          >
            <DollarSignIcon className="size-4" /> npm i motion-provider
          </Chip>
          <h1 className="md:text-6xl tracking-tighter pt-2 capitalize">
            the story of simple square
          </h1>
          <p className="text-muted max-w-xs pt-3 leading-snug tracking-tight">
            Motion Provider is free to use and open source. Get started in 5
            minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
