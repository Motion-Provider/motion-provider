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
  provider: fontProviders.google(),
  build: { format: "directory" },
  integrations: [mdx(), react(), sitemap()],
  prefetch: { defaultStrategy: "hover" },
  markdown: {
    shikiConfig: { theme: syntaxTheme },
  },
  vite: { plugins: [tailwindcss()] },
});
