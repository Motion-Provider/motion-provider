// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import syntaxTheme from "./src/lib/highlight.theme.ts";

export default defineConfig({
  site: "https://docs.motionprovider.dev",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [mdx(), react(), sitemap()],
  prefetch: { defaultStrategy: "hover" },
  markdown: {
    shikiConfig: { theme: syntaxTheme },
  },
  fonts: [
    {
      name: "Sora",
      cssVariable: "--font-primary",
      provider: fontProviders.google(),
      weights: [100, 200, 300, 400, 500, 600, 700, 800],
      display: "swap",
    },
    {
      name: "Geist Mono",
      cssVariable: "--font-secondary",
      provider: fontProviders.google(),
      weights: [100, 200, 300, 400, 500, 600, 700, 800],
      display: "swap",
    }
  ],
  vite: { plugins: [tailwindcss()] },
});
