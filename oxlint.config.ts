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
  ],
  categories: {
    correctness: "error",
    suspicious: "warn",
    pedantic: "warn",
    perf: "warn",
  },
  rules: {
    "max-lines": "off",
    "max-lines-per-function": "off",
    "no-unused-vars": "warn",

    "import/max-dependencies": "off",
    "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],

    "react-perf/jsx-no-jsx-as-prop": "off",
    "react-perf/jsx-no-new-function-as-prop": "off",
    "react-perf/jsx-no-new-object-as-prop": "off",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    "jsx-a11y": {
      // polymorphicPropName: null,
      components: {},
      attributes: {},
    },
    next: {
      rootDir: [],
    },
    react: {
      formComponents: [],
      linkComponents: [],
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
  },
  globals: {},
  ignorePatterns: [],
});
