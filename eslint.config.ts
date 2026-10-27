import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import svelte from "eslint-plugin-svelte";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

import svelteConfig from "./svelte.config";

export default defineConfig([
  globalIgnores([".astro", "dist"]),
  {
    // files: ["**/*.{js,mjs,cjs,ts,mts,cts,astro,svelte}"],
    // oxlint will lint js/ts, while it doesn't support Astro yet
    files: ["**/*.astro"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      ...astro.configs.recommended,
      ...astro.configs["jsx-a11y-strict"],
    ],
    rules: {
      // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
      // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      "no-undef": "off",

      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    // files: ["**/*.{js,mjs,cjs,ts,mts,cts,astro,svelte}"],
    // oxlint will lint js/ts, while it doesn't support Svelte yet
    files: ["**/*.svelte", "**/*.svelte.ts"],
    extends: [js.configs.recommended, tseslint.configs.recommended, svelte.configs.recommended],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        svelteConfig,
      },
    },
    rules: {
      // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
      // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      "no-undef": "off",

      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
]);
