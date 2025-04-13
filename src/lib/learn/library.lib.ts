import { MotionProviderLibraryItemProps } from "@/interfaces";
import {
  ArrowBigRightDash,
  BookOpen,
  Box,
  Boxes,
  Sparkle,
  Waypoints,
} from "lucide-react";

export default [
  {
    title: "What Motion Provider Does? (Overview - 1)",
    desc: "Discover the core concepts of Motion Provider.",
    icon: BookOpen,
    link: "/learn/overview-1",
    level: "beginner",
  },
  {
    title: "Arhitecture of Motion Provider (Overview - 2)",
    desc: "Learn the fundamentals of Motion Provider.",
    icon: Waypoints,
    link: "/learn/overview-2",
    level: "beginner",
  },
  {
    title: "Understanding Motion Provider",
    desc: "Learn how to get started with Motion Provider.",
    icon: Sparkle,
    link: "/learn/quick-start-1",
    level: "beginner",
  },
  {
    title: "Quick Start with Next.js",
    desc: "Learn how to install & setup Motion Provider with CLI or manually.",
    icon: ArrowBigRightDash,
    link: "/learn/quick-start-2",
    level: "beginner",
  },
  {
    title: "Our Best Friend <MotionContainer /> Essentials & Usage",
    desc: "Learn the core animation component providing 65+ predefined animations across 11 categories.",
    icon: Box,
    link: "/learn/motion-container",
    level: "beginner",
  },
  {
    title: "Advanced animation sequencer <MotionChain /> Essentials & Usage",
    desc: "Learn advanced animation sequencer for coordinating complex animation timelines across multiple elements.",
    icon: Box,
    link: "/learn/motion-chain",
    level: "intermediate",
  },
  {
    title:
      "The first motion image component in the world <MotionImage /> Essentials & Usage",
    desc: "21,840+ built-in animation combination variations, learn animating your all images with Motion Image.",
    icon: Box,
    link: "/learn/motion-image",
    level: "intermediate",
  },
  {
    title: "Text animator <MotionText /> Essentials & Usage",
    desc: "Learn animating your text with Motion Text, ",
    icon: Box,
    link: "/learn/motion-text",
    level: "beginner",
  },
  {
    title: "Custom animations with Motion Provider utils & hooks",
    desc: "Learn using hooks of the Motion Provider, creating custom animations, getRandomAnimation and more.",
    icon: Boxes,
    link: "/learn/custom-animations",
    level: "intermediate",
  },
  {
    title: "Centralized Animation System(CAS) - Part 1",
    icon: Boxes,
    desc: "Learn Controlling over the animations, breaking down the single-thread controlling systems.",
    level: "advanced",
    link: "/learn/cas-1",
  },
  {
    title: "Centralized Animation System(CAS) - Part 2",
    icon: Boxes,
    desc: "Learn the component-thread controlling systems and sequence system.",
    level: "advanced",
    link: "/learn/cas-2",
  },
  {
    title: "Exit sequencer animations with <MotionLink />",
    icon: Box,
    desc: "Learn how to use Motion Link to create exit layout animations useing the CAS and Motion Link.",
    level: "advanced",
    link: "/learn/motion-link",
  },
  {
    title: "Creating animation sliders with <MotionMovie />",
    icon: Box,
    desc: "Learn how to use Motion Movie to animate your component in slider manner.",
    level: "advanced",
    link: "/learn/motion-movie",
  },
] as MotionProviderLibraryItemProps[];
