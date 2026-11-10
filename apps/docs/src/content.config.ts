import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const docs = defineCollection({
  loader: glob({
    pattern: ["**/*.{md,mdx}", "!**/_*", "!examples/**"],
    base: "../../docs",
  }),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1).max(200),
      order: z.number().int().nonnegative().default(1000),
      draft: z.boolean().default(false),
    })
    .strict(),
});

export const collections = { docs };
