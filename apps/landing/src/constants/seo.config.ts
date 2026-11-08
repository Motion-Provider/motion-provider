export interface SeoConfig {
  readonly siteUrl: string;
  readonly siteName: string;
  readonly language: string;
  readonly locale: string;
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly themeColor: string;
  readonly author: { readonly name: string; readonly url: string };
  readonly twitterHandle: string | null;
  readonly logoPath: string;
  readonly ogImage: {
    readonly path: string;
    readonly width: number;
    readonly height: number;
    readonly type: string;
    readonly alt: string;
  };
  readonly links: {
    readonly githubOrg: string;
    readonly github: string;
    readonly npm: string;
    readonly docs: string;
    readonly playground: string;
  };
}

export const SEO: SeoConfig = {
  siteUrl: "https://motionprovider.dev",
  siteName: "Motion Provider",
  language: "en",
  locale: "en_US",
  title:
    "Motion Provider — Preset-driven animation engine for React and the Web",
  description:
    "Preset-driven animation engine for the web and React. Type-safe, WAAPI-powered in-view, scroll, enter/exit and chained animations in a tiny bundle.",
  keywords: [
    "motion provider",
    "react animation library",
    "preset-driven animation",
    "web animations api",
    "waapi",
    "scroll animation react",
    "in-view animation",
    "enter exit animation",
    "typescript animation library",
    "framer motion alternative",
    "gsap alternative",
    "animejs alternative",
  ],
  themeColor: "#070505",
  author: { name: "Burak Bilen", url: "https://burakdev.com" },
  twitterHandle: null,
  logoPath: "/logo.png",
  ogImage: {
    path: "/og-image.png",
    width: 1112,
    height: 475,
    type: "image/png",
    alt: "Motion Provider — preset-driven animation engine for the web and React",
  },
  links: {
    githubOrg: "https://github.com/Motion-Provider",
    github: "https://github.com/Motion-Provider/motion-provider",
    npm: "https://www.npmjs.com/package/motion-provider",
    docs: "https://docs.motionprovider.dev",
    playground: "https://playground.motionprovider.dev",
  },
};
