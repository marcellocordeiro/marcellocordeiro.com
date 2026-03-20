import { allPosts as __posts, type Post } from "../../.content-collections/generated";

const sortedAllPosts = __posts.toSorted(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

const tags = [...new Set(sortedAllPosts.flatMap((p) => p.tags))].toSorted();

export function getBlogPosts(): Post[] {
  const isDev = process.env.NODE_ENV === "development";

  return sortedAllPosts.filter((p) => (p.dev ? isDev : true));
}

export function getBlogPost(slug: string): Post | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

export function getAdjacentBlogPosts(
  slug: string,
): undefined | { previous?: Post; current: Post; next?: Post } {
  const posts = getBlogPosts();
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

export function getBlogPostsSlugs(): { slug: string }[] {
  return getBlogPosts().map(({ slug }) => ({ slug }));
}

export function getBlogPostsTags(): { tag: string }[] {
  return tags.map((tag) => ({ tag }));
}

export type { Post };
