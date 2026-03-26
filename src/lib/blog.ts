import { allPosts as __posts, type Post } from "../../.content-collections/generated";

const { posts, tags } = (() => {
  const isDev = process.env.NODE_ENV === "development";

  const sortedPosts = __posts
    .filter((p) => (p.dev ? isDev : true))
    .toSorted((a, b) => b.date.valueOf() - a.date.valueOf());

  const sortedTags = [...new Set(sortedPosts.flatMap((p) => p.tags))].toSorted();

  return { posts: sortedPosts, tags: sortedTags };
})();

export function getBlogPosts(): Post[] {
  return posts;
}

export function getBlogPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAdjacentBlogPosts(
  slug: string,
): { previous?: Post; current: Post; next?: Post } | undefined {
  const index = posts.findIndex((p) => p.slug === slug);

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
  return posts.map(({ slug }) => ({ slug }));
}

export function getBlogPostsTags(): { tag: string }[] {
  return tags.map((tag) => ({ tag }));
}

export type { Post };
