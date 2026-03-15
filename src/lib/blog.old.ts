import fs from "node:fs";
import path from "node:path";

import type { Element } from "mdx/types";
import { z } from "zod";

const BlogPostFrontmatterSchema = z.object({
  title: z.string(),
  date: z.iso.date(),
  description: z.string(),
  tags: z.array(z.string()),
  keywords: z.array(z.string()),
});

export type BlogPostFrontmatter = z.infer<typeof BlogPostFrontmatterSchema>;

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  MDXContent: Element;
}

const extensions = new Set([".mdx"]);
const postsDir = path.join(process.cwd(), "src", "content", "blog");

export async function getBlogPosts(): Promise<BlogPost[]> {
  const filenames = fs.readdirSync(postsDir);

  const result = await Promise.all(
    filenames
      .filter((filename) => extensions.has(path.extname(filename)))
      .map(async (filename) => {
        const slug = path.basename(filename, path.extname(filename));
        return await getBlogPost(slug);
      }),
  );
  return result.toSorted(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const { default: MDXContent, frontmatter: rawFrontmatter } = await import(
    `@/content/blog/${slug}.mdx`
  );
  const frontmatter = BlogPostFrontmatterSchema.parse(rawFrontmatter);
  return Object.assign(frontmatter, { slug, MDXContent });
}
