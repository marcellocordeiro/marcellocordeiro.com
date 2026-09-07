import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import Icons from "unplugin-icons/vite";

import { SITE_URL } from "@/config/constants";
import { hastExternalLinks } from "@/plugins/hast/external-links";
import { mdastModifiedTimePlugin } from "@/plugins/mdast/modified-time";
import { mdastReadingTimePlugin } from "@/plugins/mdast/reading-time";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap(), react()],
  markdown: {
    processor: satteri({
      mdastPlugins: [mdastModifiedTimePlugin, mdastReadingTimePlugin],
      hastPlugins: [hastExternalLinks],
    }),
  },
  vite: {
    plugins: [tailwindcss(), Icons({ scale: 1, compiler: "jsx", jsx: "react" })],
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
      cssVariable: "--font-sans",
      fallbacks: ["sans-serif"],
      provider: fontProviders.fontsource(),
      weights: ["100 900"],
    },
    {
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      fallbacks: ["monospace"],
      provider: fontProviders.fontsource(),
      weights: ["100 800"],
    },
  ],
});
