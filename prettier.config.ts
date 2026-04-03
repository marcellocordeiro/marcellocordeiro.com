import type { Config } from "prettier";

const config: Config = {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-svelte",
    "prettier-plugin-tailwindcss", // Needs to be last
  ],
  tailwindStylesheet: "./src/styles/globals.css",
  tailwindFunctions: ["clsx", "cva", "cn"],
  overrides: [
    { files: "*.astro", options: { parser: "astro" } },
    { files: "*.svelte", options: { parser: "svelte" } },
  ],
};

export default config;
