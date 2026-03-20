import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Link } from "@/components/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { ChevronLeftIcon } from "@/config/icons";
import { getAdjacentBlogPosts, getBlogPost, getBlogPostsSlugs } from "@/lib/blog";

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
  const posts = getAdjacentBlogPosts(slug);

  if (!posts) {
    notFound();
  }

  const { previous, current, next } = posts;
  const { title, Content } = current;

  return (
    <Typography className="mx-auto">
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

        <div className="flex gap-5">
          {previous && <PreviousPost slug={previous.slug} title={previous.title} />}

          {next && <NextPost slug={next.slug} title={next.title} />}
        </div>
      </div>
    </Typography>
  );
}

interface NavigationProps {
  slug: string;
  title: string;
}

function NextPost({ slug, title }: NavigationProps) {
  return (
    <Link className="w-full" href={`/blog/${slug}`}>
      <Card className="max-w-full">
        <CardHeader className="">
          <CardTitle>{`Next -->`}</CardTitle>
          <CardDescription>{title}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

function PreviousPost({ slug, title }: NavigationProps) {
  return (
    <Link className="w-full" href={`/blog/${slug}`}>
      <Card className="">
        <CardHeader className="">
          <CardTitle>{`<-- Previous`}</CardTitle>
          <CardDescription>{title}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export function generateStaticParams() {
  return getBlogPostsSlugs();
}
