import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import Icons from "unplugin-icons/vite";

import { SITE_URL } from "./src/config/constants";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap(), svelte()],
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
      provider: fontProviders.fontsource(),
      weights: ["100 900"],
    },
    {
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      provider: fontProviders.fontsource(),
      weights: ["100 800"],
    },
  ],
});
