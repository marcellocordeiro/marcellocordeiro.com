import { Feed } from "feed";

import { info } from "@/config/constants";
import { getBlogPosts } from "@/lib/blog";

export function GET() {
  const feed = new Feed({
    title: "Marcello's Blog",
    description: "Description",
    id: info.siteUrl,
    link: info.siteUrl,
    language: "en",
    favicon: `${info.siteUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} Marcello Cordeiro`,
    feedLinks: {
      rss2: `${info.siteUrl}/rss.xml`,
      //atom: `${siteUrl}/atom.xml`,
    },
    author: {
      name: "Marcello Cordeiro",
      email: "you@yoursite.com",
    },
  });

  for (const post of getBlogPosts()) {
    feed.addItem({
      title: post.title,
      id: `${info.siteUrl}/blog/${post.slug}`,
      link: `${info.siteUrl}/blog/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      //author: [{ name: post.author ?? 'Your Name' }],
    });
  }

  const rssFeed = feed.rss2();
  const headers = new Headers({ "content-type": "application/xml" });

  return new Response(rssFeed, { headers });
}

export const dynamic = "force-static";
