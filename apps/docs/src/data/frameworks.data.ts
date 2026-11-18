import type JavaScriptIcon from "../assets/icons/javascript.svg";
import NextjsIcon from "../assets/icons/nextjs.svg";
import ReactIcon from "../assets/icons/react.svg";
import TanStackIcon from "../assets/icons/tanstack.svg";
import TypeScriptIcon from "../assets/icons/typescript.svg";

export type TechSlug =
  | "javascript"
  | "nextjs"
  | "react"
  | "tanstack"
  | "typescript";

export type HexColor = `#${string}`;

export interface FrameworkItem {
  icon: typeof JavaScriptIcon;
  desc: string;
  title: string;
  href: `/integrations/${TechSlug}`;
  color: HexColor;
}

export default [
  {
    icon: TypeScriptIcon,
    title: "TypeScript",
    desc: "Fully typed API with strict generics and autocompletion out of the box.",
    href: "/integrations/typescript",
    color: "#3178C6",
  },
  {
    icon: NextjsIcon,
    title: "Next.js",
    desc: "Drop-in setup for the App Router, including Server and Client Component boundaries.",
    href: "/integrations/nextjs",
    color: "#fff",
  },
  {
    icon: ReactIcon,
    title: "React",
    desc: "Provider and hooks for declarative, component-driven animations.",
    href: "/integrations/react",
    color: "#61DAFB",
  },
  {
    icon: TanStackIcon,
    title: "TanStack",
    desc: "Animate TanStack Router transitions and Query-driven UI states.",
    href: "/integrations/tanstack",
    color: "#fff",
  },
] as readonly FrameworkItem[];
