import type { NavigationItem } from "@/types";

export default [
  { label: "Features", href: "#features" },
  { label: "Docs", href: "https://docs.motionprovider.dev", external: true },
  {
    label: "Playground",
    href: "https://playground.motionprovider.dev",
    external: true,
  },
  {
    label: "FAQ",
    href: "#faq",
  },
] satisfies readonly NavigationItem[];
