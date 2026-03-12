import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 80,
  sortImports: {},
  sortTailwindcss: {
    functions: ["clsx", "cn", "cva", "tw"],
    stylesheet: "src/app/globals.css",
  },
});
