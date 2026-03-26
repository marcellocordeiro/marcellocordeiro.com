import type { Metadata } from "next";

import { Link } from "@/components/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Page() {
  const items = getBlogPosts().map((post) => (
    <Link key={post.slug} href={`/blog/${post.slug}`}>
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.description}</CardDescription>
          <CardDescription>
            <time dateTime={post.date.toISOString()}>
              {post.date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  ));

  return <Typography className="mx-auto flex flex-col gap-4">{items}</Typography>;
}
