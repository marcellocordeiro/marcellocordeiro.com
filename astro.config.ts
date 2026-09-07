import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
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
  integrations: [mdx(), sitemap(), svelte()],
  markdown: {
    processor: satteri({
      mdastPlugins: [mdastModifiedTimePlugin, mdastReadingTimePlugin],
      hastPlugins: [hastExternalLinks],
    }),
  },
  vite: {
    plugins: [tailwindcss(), Icons({ scale: 1, compiler: "svelte" })],
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
