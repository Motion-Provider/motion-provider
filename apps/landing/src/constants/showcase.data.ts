import type { ShowcaseItem } from "@/types/types-showcase";

export default [
  {
    id: "motion-container.demo",
    slot: 0,
    type: "component",
    title: "<MotionContainer />",
    tagline: "Wrap anything. It animates on view.",
    desc: "A viewport-triggered wrapper. Drop it around any element, pick a preset, ship.",
    imgSrc: "/assets/backgrounds/motion-container.webp",
    snippet: `import { MotionContainer } from "motion-provider";

<MotionContainer animation={{ mode: ["fadeIn", "filterBlurIn"] }}>
  <Circle />
</MotionContainer>`,
  },
  {
    id: "motion-text.demo",
    slot: 1,
    type: "component",
    title: "<MotionText />",
    tagline: "Split. Stagger. Reveal.",
    desc: "Breaks text into pieces and staggers a preset across them. Headlines stop being static, they're more like — ALIVE.",
    imgSrc: "/assets/backgrounds/motion-text.webp",
    snippet: `import { MotionText } from "motion-provider";

<MotionText animation={{ mode: ["flash", "filterBlurIn"] }}
  config={{
    delayLogic: "chaotic",
  }}
  elementType="h3"
>
  Motion Provider
</MotionText>`,
  },
  {
    id: "motion-link.demo",
    slot: 5,
    type: "component",
    title: "<MotionLink />",
    tagline: "Click. Hover. Tap.",
    desc: "Mollit do do non sit do anim consequat dolor quis minim laboris consectetur ad ex.",
    imgSrc: "/assets/backgrounds/motion-link.webp",
    snippet: `import { MotionLink } from "motion-provider";

<MotionLink href="/" animation={{ mode: "filterBlurIn" }}>
  Home
</MotionLink>`,
  },
  {
    id: "motion-image.demo",
    slot: 3,
    type: "component",
    title: "<MotionImage />",
    tagline: "One image. Hundreds of pieces.",
    desc: "Fragments an image into a grid of tiles and animates each piece independently using deterministic algorithms.",
    imgSrc: "/assets/backgrounds/motion-image.webp",
    snippet: `import { MotionImage } from "motion-provider";

<MotionImage
  config={{
    img: '/assets/image.webp',
    pieces: 64,
    delayLogic: "sinusoidal",
    duration: 1.5,
  }}
  animation={{
    mode: ["clipDown", "filterBlurIn"],
    transition: "gentle",
    duration: 1,
  }}
/>
`,
  },
  {
    id: "motion-chain.demo",
    slot: 2,
    type: "component",
    title: "<MotionChain />",
    tagline: "Sequence without timelines.",
    desc: "Animates a group of elements or nodes in sequence. Auto-detects the order & timing.",
    imgSrc: "/assets/backgrounds/motion-chain.webp",
    snippet: `import { MotionChain } from "motion-provider";
import elements from "./data";

const animations: MotionAnimationProps[] = elements.map((_, idx) => ({
  mode: idx % 2 === 0 ? "fadeRight" : "fadeLeft",
  transition: "bounceSoft",
}));

<MotionChain
  animations={animations}
  config={{
    duration: 0.24,
  }}
  elementType="g"
>
  {elements}
</MotionChain>`,
  },
  {
    id: "motion-registry.demo",
    slot: 6,
    type: "lib",
    title: "createMotionRegistry()",
    tagline: "It's just woow",
    imgSrc: "/assets/backgrounds/motion-registry.webp",
    desc: "Defines reusable props which allows you to keep your workflow so-called organized",
    snippet: `import { createMotionConfig } from "@/motion/config";

export default createMotionConfig({
  appHeroTitle: {
    type: "MotionText",
    props: {
      elementType: "h1",
      animation: {
        mode: ["textShimmer", "transformTextGlow", "filterBlurIn"],
        transition: "slowCubic",
        delay: 0.3,
        duration: 1.5,
      },
      config: { mode: "chars", delayLogic: "chaotic", duration: 0.08 },
    },
  },
  appHeroDescription: {
    type: "MotionContainer",
    props: {
      elementType: "p",
      animation: {
        mode: ["fadeIn", "filterBlurIn"],
        transition: "gentle",
        delay: 1.5,
        duration: 1.5,
      },
    },
  },
  appHeroLink: {
    type: "MotionLink",
    props: { href: "/about", timeout: 10000 },
  },
});`,
  },
  {
    id: "motion-motion.demo",
    slot: 7,
    type: "component",
    title: "<Motion />",
    tagline: "Lighten up version of the container.",
    desc: "Unopinionated wrapper that feels eased. Best for lightweight and simple animations.",
    imgSrc: "/assets/backgrounds/motion-motion.webp",
    snippet: `<MotionContainer animation={{ mode: "rotateClockwise" }}>
  <Badge />
</MotionContainer>`,
  },
  {
    id: "motion-hooks.demo",
    slot: 8,
    type: "hook",
    title: "The hooks",
    tagline: "One hook to control all animations.",
    desc: "Introducing the controlled animation system which allows you to control the animation lifecycle with a line of code.",
    imgSrc: "/assets/backgrounds/motion-hooks.webp",
    snippet: `import { useController } from "motion-provider/hooks";

const controller = useController();`,
  },
] as const satisfies readonly ShowcaseItem[];
