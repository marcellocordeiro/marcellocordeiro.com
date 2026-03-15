import { Feed } from "feed";

import { getBlogPosts } from "@/lib/blog";

export function GET() {
  const siteUrl = "https://marcellocordeiro.com";

  const feed = new Feed({
    title: "Marcello's Blog",
    description: "Description",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} Marcello Cordeiro`,
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
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
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
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
