"use client";

import {
  Bird,
  Cat,
  Dog,
  Fish,
  Rabbit,
  Rat,
  Snail,
  Squirrel,
  Turtle,
} from "lucide-react";
import {
  type AnimationModule,
  Motion,
  useReducedMotion,
} from "motion-provider";
import {
  type KeyboardEvent,
  type PointerEvent,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const OPTIONS = [
  { name: "Bird", Icon: Bird },
  { name: "Cat", Icon: Cat },
  { name: "Dog", Icon: Dog },
  { name: "Fish", Icon: Fish },
  { name: "Rabbit", Icon: Rabbit },
  { name: "Rat", Icon: Rat },
  { name: "Snail", Icon: Snail },
  { name: "Squirrel", Icon: Squirrel },
  { name: "Turtle", Icon: Turtle },
];

const STEP = 60;
const HEIGHT = 288;
const INITIAL_INDEX = 4;
const LAST_INDEX = OPTIONS.length - 1;
const SAMPLES = 8;

function clampIndex(index: number) {
  return Math.max(0, Math.min(LAST_INDEX, index));
}

function getWheelState(distance: number) {
  const depth = Math.abs(distance);
  const angle = Math.min(3.5, depth) * 0.36;

  const x = -(1 - Math.cos(angle)) * 100;
  const y = Math.sign(distance) * Math.sin(angle) * 180 - distance * STEP;

  const rotate = Math.max(-32, Math.min(32, distance * 9));
  const scale = Math.max(0.78, 1 - depth * 0.055);
  const opacity = Math.exp(-depth * 0.95);
  const blur = Math.min(12, 1.4 * depth ** 1.4);

  return {
    transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`,
    opacity,
    filter: `blur(${blur}px)`,
  };
}

function getWheelDefinition(index: number): AnimationModule {
  const frames = Array.from(
    { length: LAST_INDEX * SAMPLES + 1 },
    (_, frame) => {
      const position = frame / SAMPLES;

      return getWheelState(index - position);
    },
  );

  return {
    initial: getWheelState(index),
    animate: {
      transform: frames.map((frame) => frame.transform),
      opacity: frames.map((frame) => frame.opacity),
      filter: frames.map((frame) => frame.filter),
    },
  };
}

const wheelOptions = OPTIONS.map((option, index) => ({
  ...option,
  definition: getWheelDefinition(index),
}));

type DragState = {
  pointerId: number;
  startY: number;
  startTop: number;
  moved: boolean;
};

export default function OptionWheel() {
  const id = useId();
  const reducedMotion = useReducedMotion();

  const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null);

  const [selected, setSelected] = useState(INITIAL_INDEX);
  const [animationFailed, setAnimationFailed] = useState(false);

  const drag = useRef<DragState | null>(null);
  const suppressClick = useRef(false);
  const destination = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (scrollRoot) {
      scrollRoot.scrollTop = INITIAL_INDEX * STEP;
    }
  }, [scrollRoot]);

  function scrollToIndex(index: number, animate = !reducedMotion) {
    const next = clampIndex(index);

    destination.current = next;

    scrollRoot?.scrollTo({
      top: next * STEP,
      behavior: animate ? "smooth" : "instant",
    });
  }

  function handleScroll() {
    if (!scrollRoot) return;

    const position = scrollRoot.scrollTop / STEP;

    setSelected(clampIndex(Math.round(position)));

    if (
      destination.current !== null &&
      Math.abs(position - destination.current) < 0.01
    ) {
      destination.current = null;
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = destination.current ?? selected;

    let next: number;

    switch (event.key) {
      case "ArrowDown":
        next = current + 1;
        break;
      case "ArrowUp":
        next = current - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = LAST_INDEX;
        break;
      default:
        return;
    }

    event.preventDefault();
    scrollToIndex(next, false);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    suppressClick.current = false;
    destination.current = null;

    if (event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    event.currentTarget.focus({ preventScroll: true });

    drag.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startTop: event.currentTarget.scrollTop,
      moved: false,
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;

    if (
      !current ||
      current.pointerId !== event.pointerId ||
      !(event.buttons & 1)
    ) {
      return;
    }

    const delta = current.startY - event.clientY;

    if (!current.moved) {
      if (Math.abs(delta) < 5) return;

      current.moved = true;
      suppressClick.current = true;

      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.style.scrollSnapType = "none";
    }

    event.currentTarget.scrollTop = current.startTop + delta;
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;

    if (!current || current.pointerId !== event.pointerId) {
      return;
    }

    drag.current = null;

    if (!current.moved) return;

    const root = event.currentTarget;
    const index = Math.round(root.scrollTop / STEP);

    root.style.removeProperty("scroll-snap-type");

    scrollToIndex(index);
  }

  const animated = scrollRoot && !reducedMotion && !animationFailed;

  return (
    <div className="@container w-full max-w-md overflow-hidden rounded-2xl text-white">
      <div
        ref={setScrollRoot}
        role="listbox"
        tabIndex={0}
        aria-label="Select an animal"
        aria-activedescendant={`${id}-${selected}`}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={handlePointerEnd}
        onWheel={() => {
          destination.current = null;
        }}
        onClickCapture={(event) => {
          if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }
        }}
        style={{ height: HEIGHT }}
        className="cursor-grab touch-pan-y snap-y snap-mandatory select-none overflow-x-hidden overflow-y-auto outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/70 active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        <div
          style={{
            paddingBlock: (HEIGHT - STEP) / 2,
          }}
        >
          {wheelOptions.map(({ name, Icon, definition }, index) => (
            // biome-ignore lint/a11y/useFocusableInteractive lint/a11y/useKeyWithClickEvents: The listbox keeps focus and handles keyboard selection.
            <div
              key={name}
              id={`${id}-${index}`}
              role="option"
              aria-selected={selected === index}
              onClick={() => scrollToIndex(index)}
              style={{ height: STEP }}
              className="flex snap-center items-center pl-[clamp(1.25rem,10cqi,3rem)]"
            >
              {animated ? (
                <Motion
                  elementType="span"
                  definition={definition}
                  timing={{
                    duration: 1,
                    easing: "linear",
                    fill: "both",
                  }}
                  controller={{
                    scroll: {
                      source: scrollRoot,
                      axis: "y",
                      mode: "document",
                    },
                  }}
                  onMotionError={() => setAnimationFailed(true)}
                  className="pointer-events-none inline-flex origin-left items-center gap-3 whitespace-nowrap text-[clamp(1.5rem,12cqi,2.5rem)] font-medium tracking-tight"
                >
                  <Icon aria-hidden="true" className="size-[0.75em] shrink-0" />
                  {name}
                </Motion>
              ) : (
                <span
                  className={`pointer-events-none inline-flex items-center gap-3 whitespace-nowrap text-[clamp(1.5rem,12cqi,2.5rem)] font-medium tracking-tight ${
                    selected === index ? "text-white" : "text-white/40"
                  }`}
                >
                  <Icon aria-hidden="true" className="size-[0.75em] shrink-0" />
                  {name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
