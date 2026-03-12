import type { Metadata } from "next";

import { getAllBlogPosts, getBlogPost } from "@/lib/blog";

type Props = PageProps<"/blog/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { title } = await getBlogPost(slug);

  return {
    title: title,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const { MDXContent } = await getBlogPost(slug);

  return <MDXContent />;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();

  return posts.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;
