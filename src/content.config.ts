import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      image: image(),
      tags: z.array(z.string()).default([]),
      dev: z.boolean().default(false),
    }),
});

export const collections = { blog };
