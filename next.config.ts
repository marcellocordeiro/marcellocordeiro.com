import { withContentCollections } from "@content-collections/next";
import createMDX from "@next/mdx";
import type { RehypeShikiOptions } from "@shikijs/rehype";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  typedRoutes: true,
  reactCompiler: true,
  poweredByHeader: false,

  // static export
  output: "export",
  images: {
    unoptimized: true,
  },

  // dev
  allowedDevOrigins: [process.env.ALLOWED_DEV_ORIGINS].filter((a) => a !== undefined),
};

const rehypeShikiOptions: RehypeShikiOptions = {
  themes: {
    light: "github-light-default",
    dark: "github-dark-default",
  },
  defaultColor: "light-dark()",
};

const withMDX = createMDX({
  extension: /\.mdx?$/, // md and mdx
  options: {
    format: "mdx", // Keep html tags in md files
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter", "remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      "rehype-mdx-import-media",
      ["@shikijs/rehype", rehypeShikiOptions],
    ],
  },
});

export default withContentCollections(withMDX(nextConfig));
