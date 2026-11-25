import { type KeyboardEvent, type ReactNode, useId, useState } from "react";
import { COUNT, COVERS, type CoverSources, wrap } from "./covers";

function ThumbnailStrip({
  active,
  coverSources,
  id,
  onSelect,
}: {
  active: number;
  coverSources?: CoverSources;
  id: string;
  onSelect: (index: number, animate: boolean) => void;
}) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    let next: number;
    switch (event.key) {
      case "ArrowLeft":
        next = wrap(active - 1);
        break;
      case "ArrowRight":
        next = wrap(active + 1);
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = COUNT - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    onSelect(next, false);
    event.currentTarget.querySelectorAll("button")[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label="Game covers"
      onKeyDown={handleKeyDown}
      className="order-last flex justify-center gap-[min(1.2cqi,0.375rem)] px-1.5"
    >
      {COVERS.map(({ src, id: coverId, title }, index) => (
        <button
          key={coverId}
          id={`${id}-tab-${index}`}
          type="button"
          role="tab"
          aria-label={title}
          aria-controls={`${id}-stage`}
          aria-selected={index === active}
          tabIndex={index === active ? 0 : -1}
          onClick={(event) => onSelect(index, event.detail > 0)}
          className="aspect-5/7 w-[clamp(1.5rem,5.4cqi,2.375rem)] max-w-[9cqi] shrink-0 cursor-pointer overflow-hidden rounded-[3px] bg-neutral-900 opacity-45 hover:opacity-80 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white aria-selected:opacity-100 aria-selected:ring-1 aria-selected:ring-white active:scale-95 motion-reduce:active:scale-100"
        >
          <CoverImage
            src={coverSources?.[coverId] ?? src}
            className="size-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}

const COVER_CLASS =
  "block aspect-[5/7] w-[var(--cover-width)] shrink-0 object-cover";

export function CoverImage({
  src,
  className = COVER_CLASS,
}: {
  src: string;
  className?: string;
}) {
  return (
    // biome-ignore lint/performance/noImgElement: Both hosts serve optimized WebP files.
    <img
      src={src}
      alt=""
      width={320}
      height={448}
      draggable={false}
      className={className}
    />
  );
}

export function GalleryFrame({
  active,
  coverSources,
  onSelect,
  children,
}: {
  active: number;
  coverSources?: CoverSources;
  onSelect: (index: number, animate: boolean) => void;
  children: ReactNode;
}) {
  const id = useId();

  return (
    <div className="not-prose @container flex min-h-56 w-full min-w-0 flex-col justify-center gap-2 py-4 text-white [--cover-gap:clamp(0.25rem,1.1cqi,0.625rem)] [--cover-width:clamp(4.5rem,17.5cqi,9.5rem)] md:min-h-80">
      <ThumbnailStrip
        active={active}
        coverSources={coverSources}
        id={id}
        onSelect={onSelect}
      />
      <div
        id={`${id}-stage`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: The panel has no other focusable content.
        tabIndex={0}
        className="overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
      >
        <p className="sr-only">{COVERS[active]?.description}</p>
        {children}
      </div>
    </div>
  );
}

export default function ThumbnailStripExample() {
  const [active, setActive] = useState(0);
  const cover = COVERS[active];

  return (
    <GalleryFrame active={active} onSelect={setActive}>
      {cover && (
        <CoverImage src={cover.src} className={`mx-auto ${COVER_CLASS}`} />
      )}
    </GalleryFrame>
  );
}
