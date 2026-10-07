import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import Icons from "unplugin-icons/vite";

import { SITE_URL } from "@/config/constants";
import { markdownProcessor } from "@/plugins/markdown-processor";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: markdownProcessor,
  },
  vite: {
    plugins: [tailwindcss(), Icons({ scale: 1, compiler: "astro" })],
  },
  server: {
    port: 3000,
  },
  devToolbar: {
    enabled: false,
  },
  image: {
    responsiveStyles: true,
  },
  fonts: [
    {
      name: "Inter",
      cssVariable: "--font-inter",
      provider: fontProviders.google(),
      weights: ["100 900"],
    },
    {
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      provider: fontProviders.google(),
      weights: ["100 800"],
    },
  ],
  prefetch: false,
});
