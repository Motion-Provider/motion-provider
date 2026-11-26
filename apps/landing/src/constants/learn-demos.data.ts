import type { AnimationController } from "motion-provider";
import { type ComponentType, createElement } from "react";
import type { LearnCardItem } from "../../../docs/src/data/learnCards.data";

export type LearnDemoProps = { controller?: AnimationController };
type LearnDemoLoader = () => Promise<{
  default: ComponentType<LearnDemoProps>;
}>;

interface LearnDemo {
  title: string;
  hint: string;
  columns: string;
  load: LearnDemoLoader;
}

export const learnDemos: Record<LearnCardItem["slug"], LearnDemo> = {
  "learn/animating-lists/animated-search-filter": {
    title: "Animated lists",
    hint: "Type a name or email.",
    columns: "lg:col-span-5",
    load: () =>
      import("@examples/learn/animating-lists/animated-search-filter"),
  },
  "learn/micro-animations/cta-button-micro": {
    title: "Micro animations",
    hint: "Hover or press the button.",
    columns: "lg:col-span-3",
    load: async () => {
      const { default: MicroAnimationButton } = await import(
        "@examples/learn/micro-animations/cta-button-micro"
      );
      return {
        default: function MicroAnimationPreview() {
          return createElement(MicroAnimationButton, {
            variant: "primary",
            size: "md",
          });
        },
      };
    },
  },
  "learn/practicing-with-svgs/3": {
    title: "SVG path drawing",
    hint: "Change the timing, then replay.",
    columns: "lg:col-span-4",
    load: () => import("@examples/learn/practicing-with-svgs/3"),
  },
  "learn/designing-option-wheel/option-wheel": {
    title: "Option wheel",
    hint: "Scroll, drag, or use arrow keys.",
    columns: "lg:col-span-3",
    load: () => import("@examples/learn/designing-option-wheel/option-wheel"),
  },
  "learn/thumbnail-gallery/thumbnail-gallery": {
    title: "Thumbnail gallery",
    hint: "Select a cover to move the rail.",
    columns: "lg:col-span-5",
    load: () => import("@/components/learn/thumbnail-gallery-preview"),
  },
  "learn/image-slider/image-slider": {
    title: "Image slider",
    hint: "Flip through the photo stack.",
    columns: "lg:col-span-4",
    load: () => import("@examples/learn/image-slider/image-slider"),
  },
  "cas-4": {
    title: "Centralized animations",
    hint: "Play, pause, and reverse a sequence with one controller.",
    columns: "md:col-span-2 lg:col-span-12",
    load: () => import("@examples/cas-4"),
  },
};
