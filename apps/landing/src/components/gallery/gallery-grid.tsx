import { MotionChain } from "motion-provider";
import { getAnimation } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/gallery.type";
import { GalleryCard } from "./gallery-card";

const cardsAnimation = getAnimation("showcasesCards");

export function GalleryGrid({
  items,
  className,
}: {
  items: readonly GalleryItem[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 relative",
        className,
      )}
    >
      <MotionChain {...cardsAnimation}>
        {items.map((item, index) => (
          <GalleryCard key={item.id} index={index} {...item} />
        ))}
      </MotionChain>
    </ul>
  );
}
