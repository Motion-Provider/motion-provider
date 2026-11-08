import type { FooterData } from "@/types/footer.type";

export const FOOTER_DATA: FooterData = {
  brand: "Motion Provider",
  tagline: { lead: "Preset-driven.", accent: "Animated." },
  copyrightYear: 2026,
  groups: [
    {
      id: "product",
      title: "Product",
      links: [
        { label: "Documentation", href: "https://docs.motionprovider.dev" },
        { label: "Playground", href: "https://playground.motionprovider.dev" },
      ],
    },
    {
      id: "resources",
      title: "Resources",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/Motion-Provider/motion-provider",
        },
        {
          label: "npm",
          href: "https://www.npmjs.com/package/motion-provider",
        },
        {
          label: "Releases",
          href: "https://github.com/Motion-Provider/motion-provider/releases",
        },
        {
          label: "Issues",
          href: "https://github.com/Motion-Provider/motion-provider/issues",
        },
      ],
    },
    {
      id: "follow",
      title: "Follow us",
      links: [
        { label: "GitHub", href: "https://github.com/Motion-Provider" },
        { label: "X", href: "https://x.com/motionprovider" },
        { label: "daily.dev", href: "https://app.daily.dev/" },
        { label: "Bluesky", href: "https://bsky.app/profile/motionprovider" },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      links: [
        { label: "hello@burakdev.com", href: "mailto:hello@burakdev.com" },
        { label: "burakdev.com", href: "https://burakdev.com" },
      ],
    },
  ],
  legal: [
    {
      label: "MIT License",
      href: "https://github.com/Motion-Provider/motion-provider/blob/main/LICENSE",
    },
  ],
};
