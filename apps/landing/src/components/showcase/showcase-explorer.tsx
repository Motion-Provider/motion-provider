import { Chip } from "@heroui/react";
import Image from "next/image";
import type { CSSProperties, KeyboardEvent, Ref } from "react";
import { useRef } from "react";
import showcaseData from "@/constants/showcase.data";
import { cn } from "@/lib/utils";
import { useShowcase } from "@/providers/showcase.provider";
import type { ShowcaseItem } from "@/types/showcase.type";
import { CountDigit } from "../count-digit";

const VISIBLE_DEPTH = 2;
const MAX_OFFSET = VISIBLE_DEPTH + 1;

const items: readonly ShowcaseItem[] = [...showcaseData].sort(
  (a, b) => a.slot - b.slot,
);

type StackStyle = CSSProperties & { "--o": number; "--d": number };

interface StackCardProps {
  item: ShowcaseItem;
  index: number;
  offset: number;
  onSelect: (index: number) => void;
  ref: Ref<HTMLButtonElement>;
}

export function ShowcaseExplorer() {
  const { selected, setSelected } = useShowcase();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === selected),
  );

  function select(index: number) {
    const item = items[index];
    if (!item) return;
    setSelected(item.id);
    buttonRefs.current[index]?.focus();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = items.length - 1;
    let next: number;

    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = Math.min(activeIndex + 1, last);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = Math.max(activeIndex - 1, 0);
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }

    e.preventDefault();
    select(next);
  }

  return (
    <div
      role="radiogroup"
      aria-label="Showcase items"
      onKeyDown={handleKeyDown}
      className="relative h-full w-5/12 overflow-hidden rounded-l-3xl border-border"
    >
      {items.map((item, index) => (
        <StackCard
          key={item.id}
          item={item}
          index={index}
          offset={index - activeIndex}
          onSelect={select}
          ref={(el) => {
            buttonRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  );
}

function StackCard({ item, index, offset, onSelect, ref }: StackCardProps) {
  const { title, tagline, imgSrc, type } = item;

  const isSelected = offset === 0;
  const isVisible = Math.abs(offset) <= VISIBLE_DEPTH;
  const clamped = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offset));

  const style: StackStyle = {
    "--o": clamped,
    "--d": Math.abs(clamped),
    zIndex: items.length - Math.abs(offset),
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: dynamic content
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => onSelect(index)}
      style={style}
      className={cn(
        "group absolute inset-x-6 top-1/2 h-[46%] cursor-pointer overflow-hidden rounded-2xl border bg-black text-left",
        "translate-y-[calc(-50%+var(--o)*28%)] scale-[calc(1-var(--d)*0.06)]",
        "transition-[translate,scale,opacity,border-color] duration-500 ease-out motion-reduce:transition-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        isSelected ? "border-accent" : "border-accent/20",
        !isVisible && "pointer-events-none opacity-0",
      )}
    >
      {imgSrc && (
        <Image
          fill
          alt=""
          src={imgSrc}
          loading="lazy"
          fetchPriority="low"
          sizes="(min-width: 1280px) 534px, 42vw"
          className="object-cover"
        />
      )}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 bg-linear-to-b to-black transition-colors duration-150",
          "from-surface/30 group-hover:from-accent/30",
          isSelected && "from-accent/30",
        )}
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-black opacity-[calc(var(--d)*0.22)] transition-opacity duration-500 motion-reduce:transition-none"
      />
      <span className="absolute inset-0 flex flex-col items-start justify-between gap-1 p-3">
        <div className="flex items-center justify-between w-full gap-2">
          <span
            className={cn(
              "rounded-full border-0.5 border-accent bg-accent/15 px-1.5 py-0.5",
              "font-secondary text-xs font-light tracking-tight text-accent",
              "transition-colors duration-150 group-hover:bg-accent-hover group-hover:text-accent-foreground",
              isSelected && "bg-accent-hover text-accent-foreground",
            )}
          >
            {title}
          </span>
          <Chip
            variant="soft"
            color="accent"
            className="rounded-full text-[10px] font-primary tracking-normal"
            size="sm"
          >
            {type}
          </Chip>
        </div>

        <span className="flex w-full items-end justify-between gap-2">
          <span className="max-w-48 text-xs tracking-tighter text-muted">
            {tagline}
          </span>
          <CountDigit
            digit={index + 1}
            className={cn(
              "text-default text-shadow-accent transition-colors duration-150 group-hover:text-accent",
              isSelected && "text-accent",
            )}
          />
        </span>
      </span>
    </button>
  );
}
