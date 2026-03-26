import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Link } from "@/components/link";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { getAdjacentBlogPosts, getBlogPost, getBlogPostsSlugs } from "@/lib/blog";

import { PostNavigation } from "./post-navigation";

type Props = PageProps<"/blog/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const posts = getAdjacentBlogPosts(slug);

  if (!posts) {
    notFound();
  }

  const { previous, current, next } = posts;
  const { title, Content } = current;

  return (
    <Typography>
      <Link href="/blog">{"<- Back"}</Link>

      <h1 className="mt-4">{title}</h1>

      <Content />

      <Separator />

      <div>
        <div>
          <p>Tags:</p>
          {current.tags.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>

        <PostNavigation previous={previous} next={next} />
      </div>
    </Typography>
  );
}

export function generateStaticParams() {
  return getBlogPostsSlugs();
}
