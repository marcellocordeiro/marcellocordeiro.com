import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
};

const postsDir = path.join(process.cwd(), "src/content/blog");

export function getAllPosts(): BlogPost[] {
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
      const { data } = matter(raw);
      return { slug, ...data } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(postsDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as BlogPost, content };
}
