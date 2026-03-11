import type { Metadata } from "next";

import {
  type BlogPostFrontmatter,
  BlogPostFrontmatterSchema,
  getAllBlogPostInfos,
} from "@/lib/blog";

type Props = PageProps<"/blog/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter: rawFrontmatter } = await import(
    `@/content/blog/${slug}.mdx`
  );

  const frontmatter: BlogPostFrontmatter =
    BlogPostFrontmatterSchema.parse(rawFrontmatter);

  return {
    title: frontmatter.title,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const { default: MDXContent, frontmatter: rawFrontmatter } = await import(
    `@/content/blog/${slug}.mdx`
  );

  const frontmatter: BlogPostFrontmatter =
    BlogPostFrontmatterSchema.parse(rawFrontmatter);

  return <MDXContent />;
}

export async function generateStaticParams() {
  return await getAllBlogPostInfos();
}

export const dynamicParams = false;
