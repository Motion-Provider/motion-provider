"use client";

import {
  type AnimationModule,
  Motion,
  MotionText,
  useController,
} from "motion-provider";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    id: "alpine-escape",
    title: "Alpine Escape",
    category: "Explore",
    alt: "A tranquil lake surrounded by mountains",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&h=600&fit=crop&auto=format&q=85",
  },
  {
    id: "beyond-peaks",
    title: "Beyond Peaks",
    category: "Adventure",
    alt: "Rugged mountain peaks beneath an open sky",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=600&fit=crop&auto=format&q=85",
  },
  {
    id: "silent-shores",
    title: "Silent Shores",
    category: "Discover",
    alt: "A quiet mountain lake surrounded by greenery",
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&h=600&fit=crop&auto=format&q=85",
  },
];

const TOTAL = SLIDES.length;

const TEXT_REVEAL = {
  initial: {
    opacity: 0,
    y: 10,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
} satisfies AnimationModule;

function getDepth(index: number, active: number) {
  return (index - active + TOTAL) % TOTAL;
}

function getCardState(depth: number) {
  const rotation = depth === 0 ? 0 : depth % 2 === 1 ? -8 : 7;
  const x = depth === 0 ? 0 : depth % 2 === 1 ? -10 : 12;
  const y = depth * -8;
  const scale = 1 - depth * 0.045;

  return {
    transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`,
    opacity: 1 - depth * 0.15,
    filter: `blur(${depth * 0.8}px)`,
  };
}

function getCardDefinition(
  index: number,
  previous: number,
  active: number,
): AnimationModule {
  const from = getCardState(getDepth(index, previous));
  const to = getCardState(getDepth(index, active));

  if (index !== active || previous === active) {
    return {
      initial: from,
      animate: to,
    };
  }

  return {
    initial: from,
    animate: {
      transform: [
        from.transform,
        "translate(0px, -14px) rotate(0deg) scale(1.015)",
        to.transform,
      ],
      opacity: [from.opacity, 0.92, to.opacity],
      filter: [from.filter, "blur(1.5px)", to.filter],
    },
  };
}

export default function ImageSlider() {
  const controller = useController();

  const [deck, setDeck] = useState({
    active: 0,
    previous: 0,
    locked: false,
  });

  const { active, previous, locked } = deck;

  useEffect(() => {
    let current = true;

    function unlock() {
      if (!current) return;

      setDeck((state) =>
        state.active === active && state.previous === previous && state.locked
          ? { ...state, locked: false }
          : state,
      );
    }

    void controller.play().then(unlock, unlock);

    return () => {
      current = false;
    };
  }, [controller, active, previous]);

  function navigate(direction: -1 | 1) {
    setDeck((state) => {
      if (state.locked) return state;

      return {
        previous: state.active,
        active: (state.active + direction + TOTAL) % TOTAL,
        locked: true,
      };
    });
  }

  return (
    <section
      aria-label="Landscape photography collection"
      aria-roledescription="carousel"
      className="w-full max-w-sm px-7 pt-8 pb-2"
    >
      <div className="relative isolate h-52 w-full sm:h-56">
        {SLIDES.map((slide, index) => {
          const depth = getDepth(index, active);
          const isActive = depth === 0;

          return (
            <Motion
              key={slide.id}
              elementType="figure"
              definition={getCardDefinition(index, previous, active)}
              timing={{
                duration: 0.56,
                easing: [0.22, 1, 0.36, 1],
                fill: "both",
              }}
              controller={controller}
              aria-hidden={!isActive}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${TOTAL}`}
              style={{
                zIndex: TOTAL - depth,
              }}
              className="absolute inset-0 m-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl"
            >
              <img
                src={slide.src}
                alt={slide.alt}
                width={900}
                height={600}
                loading="eager"
                decoding="async"
                draggable={false}
                className="absolute inset-0 size-full object-cover"
              />

              {isActive && (
                <>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent"
                  />

                  <span className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-medium tabular-nums text-white">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(TOTAL).padStart(2, "0")}
                  </span>

                  <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
                    <Motion
                      elementType="span"
                      definition={TEXT_REVEAL}
                      timing={{
                        duration: 0.24,
                        delay: 0.22,
                        easing: "ease-out",
                      }}
                      controller={{ trigger: true }}
                      className="text-[10px] font-semibold tracking-[0.22em] text-white/70 uppercase"
                    >
                      {slide.category}
                    </Motion>

                    <MotionText
                      key={slide.id}
                      animation={{
                        mode: TEXT_REVEAL,
                        duration: 0.24,
                        delay: 0.28,
                        transition: {
                          easing: "ease-out",
                        },
                      }}
                      config={{
                        mode: "words",
                        duration: 0.045,
                        delayLogic: "linear",
                      }}
                      controller={{ trigger: true }}
                      wrapperClassName="block text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                    >
                      {slide.title}
                    </MotionText>
                  </figcaption>
                </>
              )}
            </Motion>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <span className="mr-auto text-[10px] font-medium tracking-widest text-muted uppercase">
          The collection
        </span>

        {([-1, 1] as const).map((direction) => (
          <button
            key={direction}
            type="button"
            aria-label={direction === -1 ? "Previous image" : "Next image"}
            aria-disabled={locked}
            onClick={() => navigate(direction)}
            className={`grid size-9 cursor-pointer place-items-center rounded-full border outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-disabled:cursor-not-allowed aria-disabled:opacity-40 ${
              direction === 1
                ? "border-accent bg-accent text-background"
                : "border-border bg-surface text-foreground hover:bg-surface-secondary"
            }`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path
                d={
                  direction === -1
                    ? "m12 19-7-7 7-7M5 12h14"
                    : "M5 12h14m-7-7 7 7-7 7"
                }
              />
            </svg>
          </button>
        ))}
      </div>

      <span role="status" className="sr-only">
        Image {active + 1} of {TOTAL}: {SLIDES[active]?.title}
      </span>
    </section>
  );
}
