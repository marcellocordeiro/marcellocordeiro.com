import { defineConfig } from "oxlint";

export default defineConfig({
  ignorePatterns: [],
  options: {
    reportUnusedDisableDirectives: "warn",
    typeAware: true,
  },
  settings: {
    "jsx-a11y": {
      attributes: {},
      components: {
        Button: "button",
        Link: "a",
      },
      polymorphicPropName: "as",
    },
    react: {
      linkComponents: ["Link"],
    },
    vitest: {
      typecheck: false,
    },
  },
  categories: {
    correctness: "error",
    suspicious: "warn",
    pedantic: "warn",
    perf: "warn",
    style: "warn",
    nursery: "warn",
  },
  plugins: [
    "eslint",
    "typescript",
    "unicorn",
    "react",
    "react-perf",
    "oxc",
    "import",
    "jsx-a11y",
    "node",
    "promise",
  ],
  env: {
    builtin: true,
    browser: true,
    node: true,
  },
  rules: {
    "arrow-body-style": "off",
    "capitalized-comments": "off",
    "func-style": "off",
    "id-length": "off",
    "max-lines-per-function": "off",
    "max-lines": "off",
    "max-params": "off",
    "max-statements": "off",
    "new-cap": "off",
    "no-inline-comments": "off",
    "no-magic-numbers": "off",
    "no-ternary": "off",
    "no-unreachable": "warn",
    "no-unused-vars": "warn",
    "no-useless-return": "off",
    "one-var": "off",
    "prefer-destructuring": "off",
    "require-unicode-regexp": "off",
    "sort-imports": "off", // Not very configurable yet
    "sort-keys": "off",

    "unicorn/filename-case": "off",
    "unicorn/no-null": "off",
    "unicorn/prefer-ternary": "off",

    "import/consistent-type-specifier-style": "off",
    "import/exports-last": "off",
    "import/group-exports": "off",
    "import/max-dependencies": "off",
    "import/no-anonymous-default-export": "off",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",
    "import/no-named-export": "off",
    "import/no-nodejs-modules": "off",
    "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
    "import/prefer-default-export": "off",

    "react/jsx-max-depth": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-unescaped-entities": "off",
    "react/react-in-jsx-scope": "off",

    "react-perf/jsx-no-jsx-as-prop": "off",
    "react-perf/jsx-no-new-function-as-prop": "off",
    "react-perf/jsx-no-new-object-as-prop": "off",

    "typescript/consistent-return": "off", // TypeScript's noImplicitReturns has better coverage than this
    "typescript/prefer-readonly-parameter-types": "off",
  },
  overrides: [
    {
      files: ["**/*.astro"],
      env: {
        astro: true,
      },
    },
    {
      files: ["**/*.svelte", "**/*.svelte.ts"],
      env: {
        svelte: true,
      },
    },
    {
      files: ["**/*.{spec,test}.ts"],
      plugins: ["vitest"],
      env: {
        vitest: false, // We're importing vitest components
      },
      rules: {
        "vitest/expect-expect": "off",
        "vitest/no-commented-out-tests": "off",
        "vitest/no-importing-vitest-globals": "off",
        "vitest/prefer-expect-assertions": "off",
        "vitest/prefer-expect-resolves": "off",
        "vitest/prefer-todo": "off",
      },
    },
  ],
});
