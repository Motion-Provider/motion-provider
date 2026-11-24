import { docHref } from "@/lib/docs";
import type { WrapperProps } from "@/lib/sandboxTypes";

type LearnCard = WrapperProps & { href: string };

export default [
  {
    title: "Dynamically Animated Lists (type)",
    slug: "animating-lists/animated-search-filter",
    href: docHref("learn/animating-lists"),
    withButton: false,
  },
  {
    title: "Micro Animations (hover)",
    slug: "micro-animations/cta-button-micro",
    href: docHref("learn/micro-animations"),
    withButton: false,
  },
  {
    title: "Path Draw Animations With SVGs (re-render)",
    slug: "practicing-with-svgs/3",
    href: docHref("learn/practicing-with-svgs"),
    withButton: true,
  },
] as const satisfies LearnCard[];
