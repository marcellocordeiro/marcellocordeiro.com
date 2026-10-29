// Ported from https://github.com/rehypejs/rehype-autolink-headings

import { markdownToHtml } from "satteri";
import { describe, expect, it } from "vitest";

import { satteriHastAutolinkHeadings, type SatteriHastAutolinkHeadingsOptions } from "..";
import { satteriHastSlug } from "../../hast-slug";

function byTestName<T>(files: Record<string, T>): Record<string, T> {
  const entries = Object.entries(files);

  return Object.fromEntries(
    entries.map(([key, value]) => {
      const name = key
        .replace(/^\.\/fixtures\//, "") // Remove the leading "./fixtures/"
        .replace(/\/(?:config\.json|input\.md|output\.html)$/, ""); // Remove the trailing "/config.json", "/input.md", or "/output.html"

      return [name, value];
    }),
  );
}

function expectToBeDefined<T>(value: T | undefined): asserts value is T {
  expect(value).toBeDefined();
}

describe("satteri-hast-autolink-headings rehype-autolink-headings", () => {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  const configs = import.meta.glob("./fixtures/*/config.json", {
    import: "default",
    eager: true,
  }) as Record<string, SatteriHastAutolinkHeadingsOptions>;

  const inputs = import.meta.glob("./fixtures/*/input.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  const outputs = import.meta.glob("./fixtures/*/output.html", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  const configsByName = byTestName(configs);
  const inputsByName = byTestName(inputs);
  const outputsByName = byTestName(outputs);

  const cases = Object.keys(inputsByName)
    .toSorted()
    .map((name) => ({
      name,
      config: configsByName[name],
      input: inputsByName[name],
      expected: outputsByName[name],
    }));

  it.each(cases)("$name", async ({ config, input, expected }) => {
    expectToBeDefined(input);
    expectToBeDefined(expected);

    const { html } = await markdownToHtml(input, {
      features: { headingAttributes: true },
      hastPlugins: [satteriHastSlug(), satteriHastAutolinkHeadings(config)],
    });

    expect(html.trim()).toBe(expected.trim());
  });
});
