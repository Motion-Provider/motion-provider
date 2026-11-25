import { useState } from "react";
import { COUNT, COVERS, type CoverSources } from "./covers";
import { CoverImage, GalleryFrame } from "./thumbnail-strip";

export const RAIL_CLASS =
  "relative left-[calc(50%_-_var(--cover-width)/2)] flex w-[calc(var(--cover-width)_+_var(--cover-gap))] gap-[var(--cover-gap)]";

export function translateRail(position: number) {
  return `translateX(${-position * 100}%)`;
}

export function RailCovers({ coverSources }: { coverSources?: CoverSources }) {
  return [0, 1, 2].flatMap((copy) =>
    COVERS.map(({ id, src }) => (
      <CoverImage key={`${copy}-${id}`} src={coverSources?.[id] ?? src} />
    )),
  );
}

export default function CoverRailExample() {
  const [active, setActive] = useState(0);

  return (
    <GalleryFrame active={active} onSelect={setActive}>
      <div
        className={RAIL_CLASS}
        style={{ transform: translateRail(COUNT + active) }}
      >
        <RailCovers />
      </div>
    </GalleryFrame>
  );
}
