import type { AnimationKeys, TransitionKeys } from "motion-provider";

export type AvatarItem = {
  id: number;
  src: string;
  title: string;
  desc: string;
  animationKeys: AnimationKeys[];
  transition: TransitionKeys;
};

export default [
  {
    id: 1,
    src: "/assets/avatars/blue-02d8fa4f.webp",
    title: "Rise",
    desc: "Rises with a vertical flip",
    animationKeys: ["fadeUp", "rotateFlipY"],
    transition: "fadeSlide",
  },
  {
    id: 2,
    src: "/assets/avatars/green-f082a893.webp",
    title: "Roll",
    desc: "Rolls smoothly into view",
    animationKeys: ["rotateRoll", "fadeIn"],
    transition: "gentle",
  },
  {
    id: 3,
    src: "/assets/avatars/orange-e82ab513.webp",
    title: "Drill up",
    desc: "Drops up through a reveal",
    animationKeys: ["slideDown", "fadeDown", "skewY30"],
    transition: "cubicElastic",
  },
  {
    id: 4,
    src: "/assets/avatars/purple-3428c329.webp",
    title: "Turn",
    desc: "Turns with a masked flip",
    animationKeys: ["maskGradient", "rotateFlipX"],
    transition: "elasticHard",
  },
  {
    id: 5,
    src: "/assets/avatars/red-53f21000.webp",
    title: "Fall",
    desc: "Falls down into a flip",
    animationKeys: ["fadeDown", "rotateFlipX"],
    transition: "bounceSoft",
  },
] as const satisfies AvatarItem[];
