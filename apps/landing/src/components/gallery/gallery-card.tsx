import { Chip } from "@heroui/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/gallery.type";

const FOCUS_RING = cn(
  "focus-visible:outline-none",
  "focus-visible:ring-2 focus-visible:ring-focus",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

export type GalleryCardProps = GalleryItem & {
  index: number;
  className?: string;
};

export function GalleryCard({
  index,
  className,
  category,
  title,
  description,
  href,
  image,
  imageAlt,
  tags,
  icon: Icon,
}: GalleryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative isolate flex h-full min-h-104 flex-col justify-between overflow-hidden md:min-h-136",
        "rounded-3xl border border-glass-border bg-surface-secondary p-4",
        "no-underline transition-shadow duration-300 hover:shadow-2xl",
        "motion-reduce:transition-none",
        FOCUS_RING,
        className,
      )}
    >
      {/* biome-ignore lint/performance/noImgElement: static export with images.unoptimized, next/image adds no optimization */}
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        className={cn(
          "absolute inset-0 -z-20 size-full object-cover",
          "transition-transform duration-700 ease-out group-hover:scale-105",
          "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
        )}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-black/60 via-black/5 to-black/25"
      />

      <div className="flex items-start justify-between">
        <Chip color="accent" variant="primary" size="sm" className="gap-1.5">
          <Icon aria-hidden="true" className="size-3.5" />
          {category}
        </Chip>
        <span className="font-secondary text-xs tracking-widest text-white/80">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="glass-strong flex flex-col gap-4 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-2xl font-semibold leading-tight tracking-tighter text-foreground">
              {title}
            </h3>
            <p className="text-sm leading-snug tracking-tight text-muted">
              {description}
            </p>
          </div>
          <span
            aria-hidden="true"
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-full",
              "border border-border bg-background/60 text-foreground",
              "transition-colors duration-300",
              "group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground",
              "motion-reduce:transition-none",
            )}
          >
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </span>
        </div>

        <ul className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li key={tag}>
              <Chip size="sm" variant="soft">
                {tag}
              </Chip>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
