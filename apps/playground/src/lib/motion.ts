import type {
  MotionAnimationProps,
  MotionChainConfigProps,
} from "motion-provider";
import {
  EASINGS,
  MAX_STAGGER_DELAY,
  ORDERS,
  PRESETS,
  settingsFor,
} from "../constants/motion.config";
import type {
  Attribute,
  ElementNode,
  Layer,
  Markup,
  MotionSettings,
  Project,
} from "../types/playground";

export const isElement = (node: ElementNode | string): node is ElementNode =>
  typeof node !== "string";
export const VOID_TAGS = new Set(
  "area base br col embed hr img input link meta param source track wbr".split(
    " ",
  ),
);

export function animationFor(settings: MotionSettings): MotionAnimationProps {
  return {
    mode: settings.preset,
    duration: settings.duration,
    delay: settings.delay,
    easing: EASINGS[settings.easing].value,
  };
}

export function staggerFor(settings: MotionSettings): MotionChainConfigProps {
  return {
    duration: settings.stagger,
    delayLogic: settings.order,
    seed: 42,
    maxDelay: MAX_STAGGER_DELAY,
  };
}

export function imageStyle(node: ElementNode) {
  const width = Number(node.attributes.width);
  const height = Number(node.attributes.height);
  return {
    ...(width > 0 && height > 0
      ? {
          inlineSize: `min(100%, ${width}px)`,
          aspectRatio: `${width} / ${height}`,
        }
      : {}),
    ...node.style,
  };
}

export function nodeProps(
  node: ElementNode,
): Record<string, Attribute | Record<string, string> | undefined> {
  const { "data-motion-name": _name, ...attributes } = node.attributes;
  // React controls these fields when they are supplied as value or checked.
  const { checked, value, ...rest } = attributes;
  const field = ["input", "select", "textarea"].includes(node.tag);
  return {
    ...rest,
    ...(checked !== undefined ? { defaultChecked: Boolean(checked) } : {}),
    ...(value !== undefined
      ? { [field ? "defaultValue" : "value"]: value }
      : {}),
    ...(Object.keys(node.style).length ? { style: node.style } : {}),
  };
}

export function chainChild(
  node: ElementNode,
  assigned: boolean,
  peers: ElementNode[],
) {
  const list = ["ul", "ol", "menu"].includes(node.tag);
  const first = peers[0];
  if (!first)
    return { tag: list ? "li" : "div", shared: false, props: {}, list };
  const signature = JSON.stringify(nodeProps(first));
  const shared =
    !assigned &&
    !first.attributes.id &&
    peers.every((child) => JSON.stringify(nodeProps(child)) === signature);
  return {
    tag: shared ? first.tag : list ? "li" : "div",
    shared,
    props: shared ? nodeProps(first) : {},
    list,
  };
}

export function animationTime(
  layer: Layer,
  settings: MotionSettings,
  markup: Markup,
) {
  let count = layer.itemCount;
  if (layer.kind === "MotionImage") {
    if (settings.interaction !== "auto") return 0;
    count = settings.pieces;
  }
  if (layer.kind === "MotionText") {
    const find = (nodes: Markup["nodes"]): ElementNode | undefined => {
      for (const node of nodes) {
        if (!isElement(node)) continue;
        const match = node.id === layer.id ? node : find(node.children);
        if (match) return match;
      }
    };
    const text = find(markup.nodes)?.children.join("") ?? "";
    if (settings.split === "chars") {
      count =
        typeof Intl.Segmenter === "function"
          ? [...new Intl.Segmenter().segment(text)].length
          : Array.from(text).length;
    } else count = text.match(/\s+|\S+/gu)?.length ?? count;
  }
  const largestStep =
    settings.order === "wave"
      ? Math.max(
          0,
          ...Array.from(
            { length: count },
            (_, index) => Math.sin(0.5 * index) * 0.5 + 0.5,
          ),
        )
      : settings.order === "bounce"
        ? 1
        : Math.max(count - 1, 0);
  return (
    settings.duration +
    settings.delay +
    Math.min(MAX_STAGGER_DELAY, largestStep * settings.stagger)
  );
}

export function randomized(settings: MotionSettings): MotionSettings {
  const candidates = PRESETS.filter((preset) => preset.id !== settings.preset);
  return {
    ...settings,
    preset:
      candidates[Math.floor(Math.random() * candidates.length)]?.id ?? "fadeUp",
    duration: (3 + Math.floor(Math.random() * 9)) / 10,
    delay: Math.floor(Math.random() * 4) / 20,
    stagger: (3 + Math.floor(Math.random() * 13)) / 100,
  };
}

function numberBetween(
  value: unknown,
  min: number,
  max: number,
  fallback: number,
) {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
}

export function readProject(input: unknown, markup: Markup): Project | null {
  if (typeof input !== "object" || !input) return null;
  const { name, html, template, assignments } = input as Partial<Project>;
  if (
    typeof name !== "string" ||
    typeof html !== "string" ||
    !assignments ||
    typeof assignments !== "object"
  )
    return null;
  return {
    name: name.slice(0, 90),
    html,
    template: typeof template === "string" ? template.slice(0, 32) : undefined,
    assignments: Object.fromEntries(
      markup.layers.flatMap((layer) => {
        const saved = assignments[layer.id];
        if (!saved || typeof saved !== "object") return [];
        const defaults = settingsFor(layer.kind);
        const settings: MotionSettings = {
          preset: PRESETS.some(({ id }) => id === saved.preset)
            ? saved.preset
            : defaults.preset,
          duration: numberBetween(saved.duration, 0.1, 3, defaults.duration),
          delay: numberBetween(saved.delay, 0, 2, defaults.delay),
          easing: Object.hasOwn(EASINGS, saved.easing)
            ? saved.easing
            : defaults.easing,
          split: saved.split === "chars" ? "chars" : "words",
          stagger: numberBetween(saved.stagger, 0, 0.4, defaults.stagger),
          order: ORDERS.some(({ id }) => id === saved.order)
            ? saved.order
            : "linear",
          pieces: [4, 9, 16, 25, 36, 49, 64].includes(saved.pieces)
            ? saved.pieces
            : 16,
          interaction:
            saved.interaction === "click" || saved.interaction === "hover"
              ? saved.interaction
              : "auto",
        };
        return [[layer.id, settings]];
      }),
    ),
  };
}
