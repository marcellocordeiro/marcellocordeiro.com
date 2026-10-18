import { type CollectionEntry, getCollection } from "astro:content";

type Post = CollectionEntry<"blog">;

const { posts, tags } = await (async () => {
  const isDev = process.env.NODE_ENV === "development";

  const collection = await getCollection("blog");
  const sortedPosts = collection
    .filter((p) => isDev || !p.data.dev)
    .toSorted((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const sortedTags = [...new Set(sortedPosts.flatMap((p) => p.data.tags))].toSorted();

  return { posts: sortedPosts, tags: sortedTags };
})();

export function getBlogPosts(): Post[] {
  return posts;
}

export function getBlogPostsTags(): string[] {
  return tags;
}

export function getBlogPostsByTag(tag: string): Post[] {
  return posts.filter((post) => post.data.tags.includes(tag));
}

export function getBlogPost(slug: string): Post | undefined {
  return posts.find((p) => p.data.slug === slug);
}

export function getAdjacentBlogPosts(
  slug: string,
): { previous?: Post; current: Post; next?: Post } | undefined {
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

export function getBlogPostWindows(): {
  previous?: Post;
  current: Post;
  next?: Post;
}[] {
  return posts.map((current, i) => ({
    previous: posts[i - 1],
    current,
    next: posts[i + 1],
  }));
}

export type { Post };
