import { Feed } from "feed";

import {
  AUTHOR,
  BLOG_URL,
  COPYRIGHT,
  FAVICON_ICO_URL,
  RSS_URL,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/config/constants";
import { getBlogPosts } from "@/lib/blog";

export function GET() {
  const feed = new Feed({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    link: SITE_URL,
    language: "en",
    favicon: FAVICON_ICO_URL,
    copyright: COPYRIGHT,
    feedLinks: {
      rss2: RSS_URL,
    },
    author: {
      name: AUTHOR.name,
    },
  });

  for (const post of getBlogPosts()) {
    feed.addItem({
      title: post.title,
      link: new URL(post.slug, BLOG_URL).href,
      description: post.description,
      date: post.date,
    });
  }

  const rssFeed = feed.rss2();
  const headers = new Headers({ "Content-Type": "application/xml" });

  return new Response(rssFeed, { headers });
}

export const dynamic = "force-static";
