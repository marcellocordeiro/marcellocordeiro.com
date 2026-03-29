import type { Metadata } from "next";

import { PostList } from "@/components/blog/post-list";
import { Typography } from "@/components/ui/typography";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Page() {
  const posts = getBlogPosts();

  return (
    <Typography className="flex flex-col gap-4">
      <PostList posts={posts} />
    </Typography>
  );
}
