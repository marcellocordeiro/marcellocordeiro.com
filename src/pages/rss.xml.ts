import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import { SITE_DESCRIPTION, SITE_TITLE } from "@/config/consts";
import { getBlogPosts } from "@/lib/blog";

export function GET(context: APIContext): Promise<Response> {
  const posts = getBlogPosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.id}/`,
    })),
  });
}
