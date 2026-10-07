import Image from "next/image";
import showcaseData from "@/constants/showcase.data";
import { cn } from "@/lib/utils";
import type { ShowcaseItem } from "@/types/types-showcase";
import { Scales } from "../container";

const CELL_COUNT = 9;

const data = Array.from(
  { length: CELL_COUNT },
  (_, slot) => showcaseData.find((item) => item.slot === slot) ?? null,
);

export function ShowcaseExplorer() {
  return (
    <div
      className={cn(
        "overflow-hidden relative",
        "w-5/12 h-full justify-items-center grid",
        "grid-cols-3 grid-rows-3",
      )}
    >
      {data.map((item, i) =>
        item ? (
          <Cell
            key={item.id}
            id={item.id}
            slot={item.slot}
            tagline={item.tagline}
            title={item.title}
            imgSrc={item.imgSrc}
          />
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: static item
          <div className="size-full relative" key={i}>
            <Scales
              orientation="diagonal"
              lineWidth={1}
              opacity={1}
              className=""
            />
          </div>
        ),
      )}
    </div>
  );
}

function Cell({
  id,
  slot,
  tagline,
  title,
  imgSrc,
}: Pick<ShowcaseItem, "id" | "slot" | "tagline" | "title" | "imgSrc">) {
  return (
    <button
      type="button"
      className="relative size-full border-[0.5px] border-accent/50"
    >
      <div className="bg-linear-to-b from-surface/30 to-black absolute top-0 left-0 size-full z-0" />
      {imgSrc && (
        <Image
          alt={title}
          src={imgSrc}
          fill
          preload={false}
          loading="lazy"
          fetchPriority="low"
          className="-z-10"
        />
      )}
      <div className="size-full absolute top-0 left-0 flex flex-col items-start justify-between text-left z-10 p-2.5 gap-1">
        <span
          className={cn(
            "text-accent font-secondary",
            "rounded-r-full rounded-l-full px-1.5 py-0.5",
            "border border-accent bg-accent/15",
            title.length >= 20 ? "text-[10px]" : "text-xs",
          )}
        >
          {title}
        </span>
        <span className="text-xs tracking-tighter text-muted max-w-32">
          {tagline}
        </span>
      </div>
    </button>
  );
}
