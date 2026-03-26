import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: [
    "eslint",
    "typescript",
    "unicorn",
    "react",
    "react-perf",
    "nextjs",
    "oxc",
    "import",
    "jsx-a11y",
  ],
  categories: {
    correctness: "error",
    suspicious: "warn",
    pedantic: "warn",
    perf: "warn",
    style: "warn",
    nursery: "warn",
  },
  rules: {
    "arrow-body-style": "off",
    "capitalized-comments": "off",
    "func-style": "off",
    "id-length": "off",
    "max-lines": "off",
    "max-lines-per-function": "off",
    "max-statements": "off",
    "new-cap": "off",
    "no-inline-comments": "off",
    "no-magic-numbers": "off",
    "no-ternary": "off",
    "no-unused-vars": "warn",
    "sort-imports": "off", // Not very configurable yet
    "sort-keys": "off",

    "unicorn/filename-case": "off",
    "unicorn/no-null": "off",

    "import/consistent-type-specifier-style": "off",
    "import/exports-last": "off",
    "import/group-exports": "off",
    "import/max-dependencies": "off",
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
  },
  settings: {
    "jsx-a11y": {
      // polymorphicPropName: null,
      components: {
        Link: "a",
      },
      attributes: {},
    },
    next: {
      rootDir: [],
    },
    react: {
      formComponents: [],
      linkComponents: ["Link"],
      // version: null,
      componentWrapperFunctions: [],
    },
    jsdoc: {
      ignorePrivate: false,
      ignoreInternal: false,
      ignoreReplacesDocs: true,
      overrideReplacesDocs: true,
      augmentsExtendsReplacesDocs: false,
      implementsReplacesDocs: false,
      exemptDestructuredRootsFromChecks: false,
      tagNamePreference: {},
    },
    vitest: {
      typecheck: false,
    },
  },
  env: {
    builtin: true,
    browser: true,
    node: true,
    es2024: true,
  },
  globals: {},
  ignorePatterns: [],
});
