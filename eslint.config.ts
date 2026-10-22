import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([".astro", "dist"]),
  {
    // files: ["**/*.{js,mjs,cjs,ts,mts,cts,astro}"],
    // oxlint will lint js/ts, while it doesn't support Astro yet
    files: ["**/*.astro"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      ...eslintPluginAstro.configs.recommended,
      ...eslintPluginAstro.configs["jsx-a11y-recommended"],
    ],
    rules: {
      // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
      // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      "no-undef": "off",

      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
]);
