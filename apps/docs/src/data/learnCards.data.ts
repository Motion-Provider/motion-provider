import { docHref } from "@/lib/docs";
import type { WrapperProps } from "@/lib/sandboxTypes";

type LearnCard = WrapperProps & { href?: string };

export default [
  {
    title: "Dynamically Animated Lists (type)",
    slug: "learn/animating-lists/animated-search-filter",
    href: docHref("learn/dynamic-animations/animating-lists"),
    withButton: false,
  },
  {
    title: "Micro Animations (hover)",
    slug: "learn/micro-animations/cta-button-micro",
    href: docHref("learn/interactive-animations/micro-animations"),
    withButton: false,
  },
  {
    title: "Path Draw Animations With SVGs (re-render)",
    slug: "learn/practicing-with-svgs/3",
    href: import.meta.env.DEV
      ? docHref("learn/practicing-with-svgs/path-drawing-with-svgs")
      : undefined,
    withButton: true,
  },
  {
    title: "Option Wheel (scroll, drag, or arrow keys)",
    slug: "learn/designing-option-wheel/option-wheel",
    href: docHref("learn/interactive-animations/designing-option-wheel"),
    withButton: false,
  },
  {
    title: "CAS — with controller",
    slug: "cas-4",
    href: docHref("concepts/centralized-animation-system"),
    withButton: false,
  },
] as const satisfies LearnCard[];
