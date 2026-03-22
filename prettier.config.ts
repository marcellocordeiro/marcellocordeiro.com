import type { Config } from "prettier";

const config: Config = {
  printWidth: 100,
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  tailwindStylesheet: "./src/styles/global.css",
  tailwindFunctions: ["clsx", "cn", "cva", "tw"],
};

export default config;
