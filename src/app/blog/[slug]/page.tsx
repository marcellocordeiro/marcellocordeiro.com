import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Typography } from "@/components/ui/typography";
import { getBlogPost, getBlogPostsSlugs } from "@/lib/blog";

type Props = PageProps<"/blog/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return {
    title: `${post.title} | Marcello's blog`,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <Typography className="max-w-full">
      <post.Content />
    </Typography>
  );
}

export function generateStaticParams() {
  return getBlogPostsSlugs();
}
