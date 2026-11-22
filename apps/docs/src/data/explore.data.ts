import {
  CircleFadingPlay,
  LucideCircleQuestionMark,
  LucideGitPullRequestArrow,
  LucideGraduationCap,
} from "@lucide/astro";

export interface ExploreItem {
  icon: typeof LucideGraduationCap;
  title: string;
  desc: string;
  href: string;
}

export default [
  {
    title: "what is Motion Provider?",
    icon: LucideCircleQuestionMark,
    desc: "General introduction to get started with Motion Provider explaining why its matter, capabilities, integrating Motion Provider to your UI components at ease.",
    href: "/getting-started/introduction",
  },
  {
    title: "learn with practicing",
    desc: "We crafted a complete set of instructions to speed up learning curve of the Motion Provider based on real-world components. You will learn everything to animate any site from scratch.",
    href: "/learn",
    icon: LucideGraduationCap,
  },
  {
    title: "playground guideline",
    href: "/playground/overview",
    icon: CircleFadingPlay,
    desc: "Go through guideline to get started with dedicated playground to animate even faster than any AI model you can imagine, visually and literally! You will learn how easy modularization that Motion Provider gives.",
  },
  {
    title: "Add CAS to your app",
    href: "/concepts/centralized-animation-system",
    icon: LucideGitPullRequestArrow,
    desc: "Learn how to integrate the Centralized Animation System (CAS) into your app in minutes, allowing you to create batch animations with full control and ownership.",
  },
] as const satisfies readonly ExploreItem[];
