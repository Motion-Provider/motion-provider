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
  stage: string;
  load: LearnDemoLoader;
}

export const learnDemos: Record<LearnCardItem["slug"], LearnDemo> = {
  "learn/animating-lists/animated-search-filter": {
    title: "Animated lists",
    hint: "Type a name or email.",
    columns: "lg:col-span-5",
    stage: "bg-linear-to-b from-surface-secondary/50 to-background",
    load: () =>
      import("@examples/learn/animating-lists/animated-search-filter"),
  },
  "learn/micro-animations/cta-button-micro": {
    title: "Micro animations",
    hint: "Hover or press the button.",
    columns: "lg:col-span-3",
    stage:
      "bg-radial-[ellipse_at_center] from-accent/20 to-transparent max-md:min-h-48",
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
    stage:
      "bg-radial-[ellipse_at_center] from-surface-secondary to-background/50",
    load: () => import("@examples/learn/practicing-with-svgs/3"),
  },
  "learn/designing-option-wheel/option-wheel": {
    title: "Option wheel",
    hint: "Scroll, drag, or use arrow keys.",
    columns: "lg:col-span-3",
    stage: "bg-linear-to-br from-accent/13 via-background/60 to-background",
    load: () => import("@examples/learn/designing-option-wheel/option-wheel"),
  },
  "learn/thumbnail-gallery/thumbnail-gallery": {
    title: "Thumbnail gallery",
    hint: "Select a cover to move the rail.",
    columns: "lg:col-span-5",
    stage: "bg-black max-md:min-h-56",
    load: () => import("@/components/learn/thumbnail-gallery-preview"),
  },
  "learn/image-slider/image-slider": {
    title: "Image slider",
    hint: "Flip through the photo stack.",
    columns: "lg:col-span-4",
    stage: "bg-radial-[ellipse_at_center] from-accent/12 to-background/65",
    load: () => import("@examples/learn/image-slider/image-slider"),
  },
  "cas-4": {
    title: "Centralized animations",
    hint: "Play, pause, and reverse a sequence with one controller.",
    columns: "md:col-span-2 lg:col-span-12",
    stage: "bg-linear-to-br from-accent/15 via-surface/70 to-background/65",
    load: () => import("@examples/cas-4"),
  },
};
