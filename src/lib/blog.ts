import { allPosts, type Post } from "../../.content-collections/generated";

const sortedAllPosts = allPosts.toSorted(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export function getBlogPosts(): Post[] {
  const isDev = process.env.NODE_ENV === "development";

  return sortedAllPosts.filter((p) => (p.dev ? isDev : true));
}

export function getBlogPost(slug: string): Post | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

export function getBlogPostsSlugs(): { slug: string }[] {
  return getBlogPosts().map(({ slug }) => ({ slug }));
}

export { type Post };
