import fs from "node:fs";
import path from "node:path";

import { z } from "zod";

export const BlogPostFrontmatterSchema = z.object({
  title: z.string(),
  date: z.iso.date(),
  description: z.string(),
  tags: z.array(z.string()),
  keywords: z.array(z.string()),
});

// title: Markdown tests
// description: Testing Markdown stuff
// tags:
//   - Test
//   - Markdown
// keywords:
//   - markdown
//   - test

export type BlogPostFrontmatter = z.infer<typeof BlogPostFrontmatterSchema>;

export interface BlogPostInfo {
  slug: string;
  frontmatter: BlogPostFrontmatter;
}

const extensions = new Set([".md", ".mdx"]);
const postsDir = path.join(process.cwd(), "src", "content", "blog");

// export async function getAllPosts(): Promise<BlogPost[]> {
//   return fs
//     .readdirSync(postsDir)
//     .filter((filename) => extensions.has(path.extname(filename)))
//     .map((filename) => {
//       const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
//       const { data } = matter(raw);
//
//       const frontmatter = BlogPostFrontmatterSchema.parse(data);
//
//       return Object.assign(frontmatter, { filename }) satisfies BlogPost;
//     })
//     .toSorted(
//       (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
//     );
// }

// export function getPostBySlug(slug: string): BlogPost | undefined {
//   return getAllPosts().find((post) => post.slug === slug);
//   // const filePath = path.join(postsDir, `${slug}.mdx`);
//   // const raw = fs.readFileSync(filePath, "utf8");
//   // const { data, content } = matter(raw);
//   // return { slug, frontmatter: data as BlogPost, content };
// }

export async function getAllBlogPostInfos(): Promise<BlogPostInfo[]> {
  const filenames = fs.readdirSync(postsDir);

  const result = await Promise.all(
    filenames
      .filter((filename) => extensions.has(path.extname(filename)))
      .map(async (filename) => {
        const slug = path.basename(filename, ".mdx");
        return await getBlogPostInfo({ slug });
      }),
  );
  return result.toSorted(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );

  // return fs
  //   .readdirSync(postsDir)
  //   .filter((filename) => extensions.has(path.extname(filename)))
  //   .map((filename) => {
  //     const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
  //     const { data } = matter(raw);
  //
  //     const frontmatter = BlogPostFrontmatterSchema.parse(data);
  //
  //     return Object.assign(frontmatter, { filename }) satisfies BlogPost;
  //   })
  //   .toSorted(
  //     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  //   );
}

export async function getBlogPostInfo({
  slug,
}: {
  slug: string;
}): Promise<BlogPostInfo> {
  const { frontmatter: rawFrontmatter } = await import(
    `@/content/blog/${slug}.mdx`
  );

  const frontmatter = BlogPostFrontmatterSchema.parse(rawFrontmatter);

  return { slug, frontmatter };
}
