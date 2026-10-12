import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import Icons from "unplugin-icons/vite";

import { SITE_URL } from "@/config/site";
import { markdownProcessor } from "@/plugins/satteri";
import { shikiConfig } from "@/plugins/shiki-config";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss(), Icons({ scale: 1, compiler: "astro" })],
  },
  markdown: {
    processor: markdownProcessor,
    shikiConfig,
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
