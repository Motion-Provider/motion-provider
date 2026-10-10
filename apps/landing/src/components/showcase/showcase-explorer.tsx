import Image from "next/image";
import showcaseData from "@/constants/showcase.data";
import { cn } from "@/lib/utils";
import { useShowcase } from "@/providers/showcase.provider";
import type { ShowcaseItem } from "@/types/types-showcase";
import { Scales } from "../container";
import { CountDigit } from "../count-digit";

const CELL_COUNT = 9;

const data = Array.from(
  { length: CELL_COUNT },
  (_, slot) => showcaseData.find((item) => item.slot === slot) ?? null,
);

export function ShowcaseExplorer() {
  return (
    <div
      className={cn(
        "overflow-hidden relative rounded-3xl group/grid",
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
          <div
            className="size-full relative"
            // biome-ignore lint/suspicious/noArrayIndexKey: static item
            key={i}
          >
            <Scales
              orientation="diagonal"
              lineWidth={1}
              opacity={0.25}
              color="var(--color-accent)"
            />
          </div>
        ),
      )}
    </div>
  );
}

const TARGET_BORDER_L: ReadonlySet<number> = new Set<number>([2, 5, 8]);
const TARGET_BORDER_R: ReadonlySet<number> = new Set<number>([0, 3, 6]);
const TARGET_BORDER_T: ReadonlySet<number> = new Set<number>([3, 5, 7]);
const TARGET_BORDER_B: ReadonlySet<number> = new Set<number>([1, 3, 5]);

function Cell({
  id,
  slot,
  tagline,
  title,
  imgSrc,
}: Pick<ShowcaseItem, "id" | "slot" | "tagline" | "title" | "imgSrc">) {
  const { setSelected, selected } = useShowcase();

  function handleSelect() {
    setSelected(id);
  }

  const isSelected = selected === id;

  return (
    <button
      type="button"
      className={cn(
        "relative size-full will-change-auto cursor-pointer",
        "group group-hover/grid:opacity-50 hover:opacity-100",
        "active:scale-95 transition-all border-accent",
        TARGET_BORDER_L.has(slot) && "border-l",
        TARGET_BORDER_R.has(slot) && "border-r",
        TARGET_BORDER_T.has(slot) && "border-t",
        TARGET_BORDER_B.has(slot) && "border-b",
        isSelected && "border-accent",
      )}
      onClick={handleSelect}
    >
      <CountDigit
        digit={slot + 1}
        className={cn(
          "z-50 absolute bottom-1.5 right-1.5 text-default text-shadow-accent",
          "group-hover:text-accent ",
          isSelected && "text-accent scale-150 transition-all duration-150",
        )}
      />
      <div
        className={cn(
          "bg-linear-to-b group-hover:from-accent/30 from-surface/30 to-black",
          "absolute top-0 left-0 size-full z-0 transition-colors duration-150",
          isSelected && "from-accent/30",
        )}
      />
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
      <div className="size-full absolute top-0 left-0 flex flex-col items-start justify-between text-left z-10 p-2 gap-1 pointer-events-none">
        <span
          className={cn(
            "text-accent font-secondary font-light",
            "rounded-r-full rounded-l-full px-1.5 py-0.5",
            "border-0.5 border-accent bg-accent/15 tracking-tight",
            "group-hover:bg-accent-hover group-hover:text-accent-foreground transition-colors duration-150",
            title.length >= 20 ? "text-[10px]" : "text-xs",
            isSelected && "bg-accent-hover text-accent-foreground",
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
