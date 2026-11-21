import AstroIcon from "../assets/icons/astro.svg";
import type JavaScriptIcon from "../assets/icons/javascript.svg";
import NextjsIcon from "../assets/icons/nextjs.svg";
import TanStackIcon from "../assets/icons/tanstack.svg";
import TypeScriptIcon from "../assets/icons/typescript.svg";

export type TechSlug =
  | "javascript"
  | "nextjs"
  | "react"
  | "tanstack"
  | "typescript";

export interface FrameworkItem {
  icon: typeof JavaScriptIcon;
  desc: string;
  title: string;
  href: `/integrations/${TechSlug}`;
}

export default [
  {
    icon: TypeScriptIcon,
    title: "TypeScript",
    desc: "Fully typed API with strict generics and autocompletion out of the box.",
    href: "/integrations/typescript",
  },
  {
    icon: NextjsIcon,
    title: "Next.js",
    desc: "Drop-in setup for the App Router, including Server and Client Component boundaries.",
    href: "/integrations/nextjs",
  },
  {
    icon: AstroIcon,
    title: "React",
    desc: "Fully typed API with strict generics and autocompletion out of the box.",
    href: "/integrations/astro",
  },
  {
    icon: TanStackIcon,
    title: "TanStack",
    desc: "Animate TanStack Router transitions and Query-driven UI states.",
    href: "/integrations/tanstack",
  },
] as readonly FrameworkItem[];
