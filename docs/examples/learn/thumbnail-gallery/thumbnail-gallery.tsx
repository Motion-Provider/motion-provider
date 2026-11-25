import { Motion, useReducedMotion } from "motion-provider";
import { useRef, useState } from "react";
import { RAIL_CLASS, RailCovers, translateRail } from "./cover-rail";
import { COUNT, type CoverSources, wrap } from "./covers";
import { GalleryFrame } from "./thumbnail-strip";

const timing = {
  duration: 0.28,
  easing: "cubic-bezier(0.23, 1, 0.32, 1)",
  fill: "both",
} as const;

function readPosition(rail: Element | null, fallback: number) {
  if (
    !rail?.getAnimations?.().some((effect) => effect.playState === "running")
  ) {
    return fallback;
  }

  const width = rail.getBoundingClientRect().width;
  const transform = getComputedStyle(rail).transform;
  if (!width || transform === "none") return fallback;

  return -new DOMMatrixReadOnly(transform).m41 / width;
}

export default function ThumbnailGallery({
  coverSources,
}: {
  coverSources?: CoverSources;
}) {
  const rail = useRef<HTMLElement | SVGElement>(null);
  const reducedMotion = useReducedMotion();
  const [{ active, from, to }, setSelection] = useState({
    active: 0,
    from: COUNT,
    to: COUNT,
  });

  function select(index: number, animate: boolean) {
    if (index === active) return;

    if (!animate || reducedMotion) {
      const center = COUNT + index;
      setSelection({ active: index, from: center, to: center });
      return;
    }

    const start = COUNT + wrap(readPosition(rail.current, to));
    const target = index + Math.round((start - index) / COUNT) * COUNT;
    setSelection({ active: index, from: start, to: target });
  }

  return (
    <GalleryFrame active={active} coverSources={coverSources} onSelect={select}>
      <Motion
        ref={rail}
        className={RAIL_CLASS}
        definition={{
          initial: { transform: translateRail(from) },
          animate: { transform: translateRail(to) },
        }}
        timing={timing}
        controller={{ trigger: true, isAnimationStopped: from === to }}
      >
        <RailCovers coverSources={coverSources} />
      </Motion>
    </GalleryFrame>
  );
}
