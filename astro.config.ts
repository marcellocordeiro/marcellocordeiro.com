import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import {
  satteriHastAutolinkHeadings,
  satteriHastExternalLinksPlugin,
  satteriHastSlug,
  satteriMdastModifiedTimePlugin,
  satteriMdastReadingTimePlugin,
} from "@marcellocordeiro/satteri-plugins";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import Icons from "unplugin-icons/vite";

import { SITE_URL } from "@/config/site";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap(), mdx(), svelte()],
  markdown: {
    processor: satteri({
      mdastPlugins: [satteriMdastModifiedTimePlugin(), satteriMdastReadingTimePlugin()],
      hastPlugins: [
        satteriHastExternalLinksPlugin(),
        satteriHastSlug(),
        satteriHastAutolinkHeadings({
          content: { type: "text", value: "#" },
          properties: { className: ["heading-anchor"] },
          headingProperties: { className: ["relative"] },
        }),
      ],
    }),
    shikiConfig: {
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
      defaultColor: "light-dark()",
    },
  },
  vite: {
    resolve: {
      alias: [
        { find: "~icons:svelte", replacement: "~icons" },
        { find: "~icons:astro", replacement: "~icons" },
      ],
    },
    plugins: [
      // Vite's LightningCSS already does this,
      // and optimises a little better
      tailwindcss({ optimize: false }),
      Icons({ scale: 1, compiler: "svelte" }),
      Icons({ scale: 1, compiler: "astro" }),
    ],
  },
  fonts: [
    {
      name: "Open Sans",
      cssVariable: "--font-open-sans",
      provider: fontProviders.fontsource(),
      weights: ["300 800"],
      optimizedFallbacks: false,
    },
    {
      name: "Newsreader",
      cssVariable: "--font-newsreader",
      provider: fontProviders.fontsource(),
      weights: ["200 800"],
      optimizedFallbacks: false,
    },
    {
      name: "Montserrat",
      cssVariable: "--font-montserrat",
      provider: fontProviders.fontsource(),
      weights: ["100 900"],
      optimizedFallbacks: false,
    },
    {
      name: "Fira Code",
      cssVariable: "--font-fira-code",
      provider: fontProviders.fontsource(),
      weights: ["300 700"],
      optimizedFallbacks: false,
    },
  ],
  prefetch: false,
  server: {
    port: 3000,
  },
});
