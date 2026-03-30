import rss from "@astrojs/rss";

import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/config/constants";
import { getBlogPosts } from "@/lib/blog";

export function GET(): Promise<Response> {
  const posts = getBlogPosts();

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: SITE_URL,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.data.slug}`,
    })),
  });
}
