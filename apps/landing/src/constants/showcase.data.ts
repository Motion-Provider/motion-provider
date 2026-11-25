import type { ShowcaseItem } from "@/types/showcase.type";

export default [
  {
    id: "motion-container.demo",
    slot: 0,
    title: "<MotionContainer />",
    tagline: "Wrap anything. It animates on view.",
    desc: "A viewport-triggered wrapper. Drop it around any element, pick a preset, ship.",
    imgSrc: "/assets/backgrounds/motion-container-illustration.webp",
    snippet: `import { MotionContainer } from "motion-provider";

<MotionContainer animation={{ mode: ["fadeIn", "filterBlurIn"] }}>
  <Circle />
</MotionContainer>`,
  },
  {
    id: "motion-text.demo",
    slot: 1,
    title: "<MotionText />",
    tagline: "Split. Stagger. Reveal.",
    desc: "Breaks text into pieces and staggers a preset across them. Headlines stop being static, they're more like — ALIVE.",
    imgSrc: "/assets/backgrounds/motion-text-illustration.webp",
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
    slot: 4,
    title: "<MotionLink />",
    tagline: "Click. Hover. Tap.",
    desc: "Waits for reverse playback of existing animations before navigating. Wire it with useController() to perform seamless transitions between pages.",
    imgSrc: "/assets/backgrounds/motion-link-illustration.webp",
    snippet: `import {
  MotionText, 
  MotionContainer, 
  MotionLink, 
  useController,
} from "motion-provider";

export default function Page() {
  const controls = useController();

  return (
    <>
      <MotionText
        animation={{
          mode: ["filterBlurIn", "textShimmer"],
          delay: 1,
        }}
        elementType="h1"  
        controller={controls}
      >
        Make your interface move.
      </MotionText>
      <MotionContainer
        animation={{
          mode: "fadeUp",
          delay: 1,
        }}
        elementType="p"  
        controller={controls}
      >
        One config. Shared playback. Animated navigation.
      </MotionContainer>
      <MotionLink
        controller={controls}
        navigate={(href: string) => window.location.assign(href)}
        onMouseEnter={() => prefetch(link.href)}
        onFocus={() => prefetch(link.href)}
      >
        Navigate Post
      </MotionLink>
    </>
  );
}`,
  },
  {
    id: "motion-image.demo",
    slot: 3,
    title: "<MotionImage />",
    tagline: "One image. Hundreds of pieces.",
    desc: "Fragments an image into a grid of tiles and animates each piece independently using deterministic algorithms.",
    imgSrc: "/assets/backgrounds/motion-image-illustration.webp",
    snippet: `import { MotionImage } from "motion-provider";

<MotionImage
  config={{
    img: '/assets/image-illustration.webp',
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
    title: "<MotionChain />",
    tagline: "Sequence without timelines.",
    desc: "Animates a group of elements or nodes in sequence. Auto-detects the order & timing.",
    imgSrc: "/assets/backgrounds/motion-chain-illustration.webp",
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
    id: "motion-motion.demo",
    slot: 5,
    title: "<Motion />",
    tagline: "Lighten up version of the container.",
    desc: "Unopinionated wrapper that feels eased. Best for lightweight and simple animations.",
    imgSrc: "/assets/backgrounds/motion-motion-illustration.webp",
    snippet: `import { Motion } from "motion-provider";
import { spin } from "@/motion/presets";

<Motion definition={spin} timing={{ duration: 2 }} />

// or manually define your custom animations
<Motion
  definition={{
    initial: { opacity: 0, y: 24, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
  }}
  timing={{ duration: 0.6, easing: "ease-out" }}
/>`,
  },
] as const satisfies readonly ShowcaseItem[];
