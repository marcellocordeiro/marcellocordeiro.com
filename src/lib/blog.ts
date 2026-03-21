import { type CollectionEntry, getCollection } from "astro:content";

export type Post = CollectionEntry<"blog">;

const posts = await __getBlogPosts();

const tags = [...new Set(posts.flatMap((p) => p.data.tags))].toSorted();

export function getBlogPosts(): Post[] {
  return posts;
}

export function getBlogPost(slug: string): Post | undefined {
  return getBlogPosts().find((p) => p.data.slug === slug);
}

export function getAdjacentBlogPosts(
  slug: string,
): undefined | { previous?: Post; current: Post; next?: Post } {
  const index = posts.findIndex((p) => p.data.slug === slug);

  const current = posts[index];

  if (!current) {
    return undefined;
  }

  const previous = posts[index - 1];
  const next = posts[index + 1];

  return {
    previous,
    current,
    next,
  };
}

export function getBlogPostWindows(): { previous?: Post; current: Post; next?: Post }[] {
  return posts.map((_, i) => ({
    previous: posts[i - 1],
    current: posts[i],
    next: posts[i + 1],
  }));
}

export function getBlogPostsSlugs(): { slug: string }[] {
  return getBlogPosts().map((p) => ({ slug: p.data.slug }));
}

export function getBlogPostsTags(): { tag: string }[] {
  return tags.map((tag) => ({ tag }));
}

async function __getBlogPosts() {
  const isDev = process.env.NODE_ENV === "development";

  const allPosts = await getCollection("blog");

  return allPosts
    .filter((p) => (p.data.dev ? isDev : true))
    .toSorted((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
