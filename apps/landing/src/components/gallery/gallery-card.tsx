import { Button } from "@heroui/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/gallery.type";

const FOCUS_RING = cn(
  "focus-visible:outline-none",
  "focus-visible:ring-2 focus-visible:ring-focus",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

export type GalleryCardProps = GalleryItem & {
  className?: string;
};

export function GalleryCard({
  className,
  category,
  href,
  image,
  imageAlt,
}: GalleryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative isolate flex h-full min-h-104 flex-col justify-between overflow-hidden md:min-h-136",
        "bg-surface-secondary p-4",
        "no-underline transition-shadow duration-300 hover:shadow-2xl",
        "motion-reduce:transition-none text-foreground",
        FOCUS_RING,
        className,
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        height={1400}
        width={800}
        className={cn(
          "absolute inset-0 -z-20 size-full object-cover object-top",
          "transition-transform duration-700 ease-out group-hover:scale-105",
          "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
        )}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-background to-accent/15"
      />
      <div className="flex flex-col gap-4 rounded-2xl pt-2 z-50">
        <div className="flex items-center justify-between gap-4 group-hover:text-accent">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-2xl font-semibold leading-tight tracking-tighter transition-colors duration-150">
              {category}
            </h3>
          </div>
          <Button
            variant="ghost"
            isIconOnly
            className="motion-reduce:transition-none rounded-full"
            size="lg"
          >
            <ArrowUpRight className="size-7 group-hover:text-accent transition-colors duration-150" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
