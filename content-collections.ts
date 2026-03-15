import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from "@content-collections/core";
import type { MDXContent } from "mdx/types";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "src/content/blog",
  include: "**/*.{md,mdx}",
  parser: "frontmatter-only",
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.iso.date(),
    tags: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    dev: z.boolean().default(false),
  }),
  transform: ({ _meta, ...post }) => {
    const Content = createDefaultImport<MDXContent>(
      `@/content/blog/${_meta.filePath}`,
    );

    return {
      ...post,
      Content,
    };
  },
});

export default defineConfig({
  content: [posts],
});
