import { allPosts, type Post } from "../../.content-collections/generated";

const sortedAllPosts = allPosts.toSorted(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export function getBlogPosts(): Post[] {
  return sortedAllPosts;
}

export function getBlogPost(slug: string): Post | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

export function getBlogPostsSlugs(): { slug: string }[] {
  const isDev = process.env.NODE_ENV === "development";

  return getBlogPosts()
    .filter((p) => (p.dev ? isDev : true))
    .map(({ slug }) => ({ slug }));
}

export { type Post };
