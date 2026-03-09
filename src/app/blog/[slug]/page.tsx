import { getAllPosts } from "@/lib/blog";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/content/blog/${slug}.mdx`);

  return <Post />;
}

export function generateStaticParams() {
  const posts = getAllPosts();
  console.log(posts);
  return getAllPosts();
  //return [{ slug: 'welcome' }, { slug: 'about' }]
}

export const dynamicParams = false;
