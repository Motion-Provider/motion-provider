export type ShowcaseItem = {
  id: string;
  slot: number;
  type: "component" | "hook";
  title: string;
  tagline: string;
  desc: string;
  snippet: string;
};

export const SHOWCASE_ENTRIES = [
  {
    id: "container",
    slot: 0,
    type: "component",
    title: "<MotionContainer />",
    tagline: "Wrap anything. It animates on view.",
    desc: "A viewport-triggered wrapper. Drop it around any element, pick a preset, ship.",
    snippet: `import { MotionContainer } from "motion-provider";

<MotionContainer animation={{ mode: "fadeIn" }}>
  <Card />
</MotionContainer>`,
  },
  {
    id: "text",
    slot: 1,
    type: "component",
    title: "<MotionText />",
    tagline: "Split. Stagger. Reveal.",
    desc: "Breaks text into pieces and staggers a preset across them. Headlines stop being static, they're more like — ALIVE.",
    snippet: `import { MotionText } from "motion-provider";

<MotionText animation={{ mode: "filterBlurIn" }}>
  Designed for simplicity.
</MotionText>`,
  },
  {
    id: "image",
    slot: 3,
    type: "component",
    title: "<MotionImage />",
    tagline: "One image. Hundreds of pieces.",
    desc: "Fragments an image into a grid of tiles and animates each piece independently using deterministic keyframes.",
    snippet: `import { MotionImage } from "motion-provider";

<MotionImage
  src="/hero.jpg"
  alt="Product hero"
  animation={{ mode: "fadeIn" }}
/>`,
  },
  {
    id: "chain",
    slot: 5,
    type: "component",
    title: "<MotionChain />",
    tagline: "Sequence without timelines.",
    desc: "Plays its children one after another. Order is the markup order, no timeline code.",
    snippet: `import { MotionChain } from "motion-provider";

<MotionChain>
  <Hero />
  <Headline />
  <Cta />
</MotionChain>`,
  },
  {
    id: "presets",
    slot: 7,
    type: "",
    title: "Presets",
    tagline: "Pick a name. Skip the keyframes.",
    desc: "Named, typed animations such as fadeIn, rotateClockwise and filterBlurIn. Swap one string to change the motion.",
    snippet: `<MotionContainer animation={{ mode: "rotateClockwise" }}>
  <Badge />
</MotionContainer>`,
  },
  {
    id: "reduced-motion",
    slot: 8,
    type: "hook",
    title: "useReducedMotion",
    tagline: "Accessibility, built in.",
    desc: "Reads the user's motion preference so your UI can skip or soften animation.",
    snippet: `import { useReducedMotion } from "motion-provider/hooks";

const reduced = useReducedMotion();`,
  },
] as const satisfies readonly ShowcaseItem[];
