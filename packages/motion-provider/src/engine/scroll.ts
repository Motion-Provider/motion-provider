import { finite, invariant } from "./errors.js";
import type { AnimationHandle, ScrollOptions } from "./types.js";

/** @description Clamp and map an input range; exported for deterministic tests and custom drivers. */
export function mapProgress(value: number, start = 0, end = 1): number {
  finite(start, "scroll.start");
  finite(end, "scroll.end");
  invariant(
    end > start,
    "INVALID_SCROLL_RANGE",
    "scroll.end must exceed scroll.start.",
  );
  return normalizeProgress(value, start, end);
}

function normalizeProgress(value: number, start: number, end: number): number {
  return Math.max(0, Math.min(1, (value - start) / (end - start)));
}

function measureScroll(win: Window, source: Element, viewport: boolean) {
  const rectangles = new Map<Element, DOMRect>();
  const axes = new Map<
    boolean,
    { extent: number; origin?: number; documentProgress?: number }
  >();

  const rectangle = (element: Element) => {
    let rect = rectangles.get(element);
    if (!rect) {
      rect = element.getBoundingClientRect();
      rectangles.set(element, rect);
    }
    return rect;
  };

  return (target: Element, vertical: boolean, mode: ScrollOptions["mode"]) => {
    let measurement = axes.get(vertical);
    if (!measurement) {
      const extent = viewport
        ? vertical
          ? win.innerHeight
          : win.innerWidth
        : vertical
          ? source.clientHeight
          : source.clientWidth;
      measurement = { extent };
      axes.set(vertical, measurement);
    }
    const { extent } = measurement;
    if (mode === "document") {
      if (measurement.documentProgress === undefined) {
        const range =
          (vertical ? source.scrollHeight : source.scrollWidth) - extent;
        measurement.documentProgress =
          range > 0
            ? (vertical ? source.scrollTop : source.scrollLeft) / range
            : 0;
      }
      return measurement.documentProgress;
    }

    if (!viewport && measurement.origin === undefined) {
      const root = rectangle(source);
      measurement.origin = vertical
        ? root.top + source.clientTop
        : root.left + source.clientLeft;
    }
    const rect = rectangle(target);
    const position =
      (vertical ? rect.top : rect.left) - (measurement.origin ?? 0);
    const size = vertical ? rect.height : rect.width;
    return (extent - position) / Math.max(1, extent + size);
  };
}

interface ScrollBinding {
  read: (measure: ReturnType<typeof measureScroll>) => number;
  seek: AnimationHandle["seek"];
}

function createScrollPool(
  win: Window & typeof globalThis,
  source: Element,
  viewport: boolean,
  onEmpty: () => void,
) {
  const eventTarget = viewport ? win : source;
  const bindings = new Set<ScrollBinding>();
  const targets = new Map<Element, Set<ScrollBinding>>();
  let pending = new Set<ScrollBinding>();
  let allPending = false;
  let frame: number | undefined;
  let observer: ResizeObserver | undefined;

  // Surface an individual binding failure without blocking other bindings on this source.
  const reportFrameError = (error: unknown) => {
    queueMicrotask(() => {
      throw error;
    });
  };

  const update = () => {
    frame = undefined;
    const scheduled = allPending ? bindings : pending;
    allPending = false;
    pending = new Set();
    const read = measureScroll(win, source, viewport);
    const writes: [ScrollBinding, number][] = [];
    for (const binding of scheduled) {
      if (!bindings.has(binding)) continue;
      try {
        writes.push([binding, binding.read(read)]);
      } catch (error) {
        reportFrameError(error);
      }
    }
    for (const [binding, progress] of writes) {
      if (!bindings.has(binding)) continue;
      try {
        binding.seek(progress);
      } catch (error) {
        reportFrameError(error);
      }
    }
  };

  const scheduleFrame = () => {
    if ((allPending || pending.size) && frame === undefined)
      frame = win.requestAnimationFrame(update);
  };

  const scheduleAll = () => {
    if (!bindings.size) return;
    allPending = true;
    scheduleFrame();
  };

  const scheduleResized: ResizeObserverCallback = (entries) => {
    for (const { target } of entries) {
      if (target === source) {
        scheduleAll();
        return;
      }
      const affected = targets.get(target);
      if (affected) for (const binding of affected) pending.add(binding);
    }
    scheduleFrame();
  };

  return (target: Element, binding: ScrollBinding) => {
    const first = bindings.size === 0;
    const existing = targets.get(target);
    const group = existing ?? new Set<ScrollBinding>();
    if (!existing) targets.set(target, group);
    bindings.add(binding);
    group.add(binding);

    const dispose = () => {
      if (!bindings.delete(binding)) return;
      pending.delete(binding);
      group.delete(binding);
      if (!group.size) {
        targets.delete(target);
        if (target !== source && bindings.size) observer?.unobserve(target);
      }
      if (
        frame !== undefined &&
        (!bindings.size || (!allPending && !pending.size))
      ) {
        win.cancelAnimationFrame(frame);
        frame = undefined;
      }
      if (bindings.size) return;
      eventTarget.removeEventListener("scroll", scheduleAll);
      win.removeEventListener("resize", scheduleAll);
      observer?.disconnect();
      onEmpty();
    };

    try {
      if (first) {
        eventTarget.addEventListener("scroll", scheduleAll, { passive: true });
        win.addEventListener("resize", scheduleAll, { passive: true });
        if (win.ResizeObserver) {
          observer = new win.ResizeObserver(scheduleResized);
          observer.observe(source);
        }
      }
      if (!existing && target !== source) observer?.observe(target);
      binding.seek(binding.read(measureScroll(win, source, viewport)));
    } catch (error) {
      dispose();
      throw error;
    }
    return dispose;
  };
}

const pools = new WeakMap<
  Window,
  WeakMap<Element, ReturnType<typeof createScrollPool>>
>();

/** One passive listener and frame per source. Read geometry before seeking any handles. */
export function bindScroll(
  element: HTMLElement | SVGElement,
  handle: Pick<AnimationHandle, "seek">,
  options: ScrollOptions = {},
): () => void {
  const doc = element.ownerDocument;
  const win = doc.defaultView;
  if (!win) return () => {};

  const { start = 0, end = 1, mode } = options;
  mapProgress(0, start, end);
  const source = options.source ?? doc.scrollingElement ?? doc.documentElement;
  const target = options.target ?? element;
  const vertical = options.axis !== "x";
  let sources = pools.get(win);
  if (!sources) {
    sources = new WeakMap();
    pools.set(win, sources);
  }
  const sourcesForWindow = sources;
  let bind = sourcesForWindow.get(source);
  if (!bind) {
    const viewport =
      source === doc.scrollingElement || source === doc.documentElement;
    bind = createScrollPool(win, source, viewport, () => {
      sourcesForWindow.delete(source);
    });
    sourcesForWindow.set(source, bind);
  }
  return bind(target, {
    read: (measure) =>
      normalizeProgress(measure(target, vertical, mode), start, end),
    seek: (progress) => handle.seek(progress),
  });
}
