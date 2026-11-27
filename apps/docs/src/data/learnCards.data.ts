interface LearnCard {
  title: string;
  slug: string;
  docId: string;
  draft?: boolean;
  withButton: boolean;
}

const learnCards = [
  {
    title: "Dynamically Animated Lists (type)",
    slug: "learn/animating-lists/animated-search-filter",
    docId: "learn/dynamic-animations/animating-lists",
    withButton: false,
  },

  {
    title: "Micro Animations (hover)",
    slug: "learn/micro-animations/cta-button-micro",
    docId: "learn/interactive-animations/micro-animations",
    withButton: false,
  },

  {
    title: "Path Draw Animations With SVGs (re-render)",
    slug: "learn/practicing-with-svgs/3",
    docId: "learn/practicing-with-svgs/path-drawing-with-svgs",
    draft: true,
    withButton: true,
  },

  {
    title: "Option Wheel (scroll, drag, or arrow keys)",
    slug: "learn/designing-option-wheel/option-wheel",
    docId: "learn/interactive-animations/designing-option-wheel",
    withButton: false,
  },

  {
    title: "Thumbnail Gallery (select a cover)",
    slug: "learn/thumbnail-gallery/thumbnail-gallery",
    docId: "learn/thumbnail-gallery",
    withButton: false,
  },

  {
    title: "Image Slider (navigate between images)",
    slug: "learn/image-slider/image-slider",
    docId: "learn/dynamic-animations/image-slider",
    withButton: false,
  },

  {
    title: "CAS — with controller",
    slug: "cas-4",
    docId: "registry/cas-extended",
    withButton: false,
  },
] as const satisfies LearnCard[];

export type LearnCardItem = (typeof learnCards)[number];

export default learnCards;
