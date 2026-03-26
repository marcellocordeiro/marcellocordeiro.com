import { defineConfig } from "oxfmt";

export default defineConfig({
  sortImports: {},
  sortTailwindcss: {
    functions: ["clsx", "cn", "cva", "tw"],
    stylesheet: "src/app/globals.css",
  },
});
