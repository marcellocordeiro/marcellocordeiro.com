import { defineConfig } from "oxfmt";

export default defineConfig({
  astro: true,
  sortImports: true,
  sortTailwindcss: {
    functions: ["clsx", "cn", "cva", "tw"],
    stylesheet: "src/styles/global.css",
  },
});
