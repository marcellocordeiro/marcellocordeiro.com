import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      image: z.optional(image()),
      tags: z.array(z.string()).default([]),
      dev: z.boolean().default(false),
    }),
});

export const collections = { blog };
