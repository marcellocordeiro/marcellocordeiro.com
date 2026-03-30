import { Link } from "@/components/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post } from "@/lib/blog";

export interface PostList {
  posts: Post[];
}

export function PostList({ posts }: PostList) {
  return posts.map((post) => (
    <Link key={post.data.slug} href={`/blog/${post.data.slug}`}>
      <Card>
        <CardHeader>
          <CardTitle>{post.data.title}</CardTitle>
          <CardDescription>{post.data.description}</CardDescription>
          <CardDescription>
            <time dateTime={post.data.pubDate.toISOString()}>
              {post.data.pubDate.toLocaleDateString("en-US", {
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
}
