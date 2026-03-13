import createMDX from "@next/mdx";
import type { RehypeShikiOptions } from "@shikijs/rehype";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  reactCompiler: true,
  output: "export",
};

const rehypeShikiOptions: RehypeShikiOptions = {
  themes: {
    light: "github-light-default",
    dark: "github-dark-default",
  },
  defaultColor: "light-dark()",
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      "remark-mdx-frontmatter",
      "remark-gfm",
    ],
    rehypePlugins: ["rehype-slug", ["@shikijs/rehype", rehypeShikiOptions]],
  },
});

export default withMDX(nextConfig);
