import { withContentCollections } from "@content-collections/next";
import createMDX from "@next/mdx";
import type { RehypeShikiOptions } from "@shikijs/rehype";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    unoptimized: true,
  },
  output: "export",
  typedRoutes: true,
  reactCompiler: true,
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
    remarkPlugins: [
      "remark-frontmatter",
      "remark-mdx-frontmatter",
      "remark-gfm",
    ],
    rehypePlugins: ["rehype-slug", ["@shikijs/rehype", rehypeShikiOptions]],
  },
});

export default withContentCollections(withMDX(nextConfig));
