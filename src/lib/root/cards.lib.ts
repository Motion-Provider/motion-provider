import { OverviewCardProps } from "@/interfaces";
import { BookOpen, Boxes, Swords, Terminal } from "lucide-react";

export default [
  {
    title: "PLAY",
    desc: "Create the best animation and be the king of the motion world.",
    icon: Swords,
    link: "/play",
  },
  {
    title: "Learn",
    desc: "Learn the essentials.",
    icon: BookOpen,
    link: "/learn",
  },
  {
    title: "Motion Engines",
    desc: "Develop animation prototypes.",
    icon: Terminal,
    link: "/engines",
  },
  {
    title: "Examples",
    desc: "Explore practical examples to kickstart your animations.",
    icon: Boxes,
    link: "/examples",
  },
] satisfies OverviewCardProps[];
