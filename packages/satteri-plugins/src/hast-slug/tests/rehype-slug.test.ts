// Ported from https://github.com/rehypejs/rehype-slug

import { markdownToHtml } from "satteri";
import { describe, expect, it } from "vitest";

import { satteriHastSlug } from "../index.js";

async function slug(markdown: string, options?: Parameters<typeof satteriHastSlug>[0]) {
  const { html } = await markdownToHtml(markdown, { hastPlugins: [satteriHastSlug(options)] });
  return html.trim();
}

describe("satteri-hast-slug rehype-slug", () => {
  it("should work", async () => {
    expect(
      await slug(
        [
          "# Lorem ipsum 😪",
          "## dolor—sit—amet",
          "### consectetur & adipisicing",
          "#### elit",
          "##### elit",
          "sed",
        ].join("\n"),
      ),
    ).toBe(
      [
        '<h1 id="lorem-ipsum-">Lorem ipsum 😪</h1>',
        '<h2 id="dolorsitamet">dolor—sit—amet</h2>',
        '<h3 id="consectetur--adipisicing">consectetur &amp; adipisicing</h3>',
        '<h4 id="elit">elit</h4>',
        '<h5 id="elit-1">elit</h5>',
        "<p>sed</p>",
      ].join("\n"),
    );
  });

  it("should support `options.prefix`", async () => {
    expect(
      await slug(
        [
          "# Lorem ipsum 😪",
          "## dolor—sit—amet",
          "### consectetur & adipisicing",
          "#### elit",
          "##### elit",
          "sed",
        ].join("\n"),
        { prefix: "test-" },
      ),
    ).toBe(
      [
        '<h1 id="test-lorem-ipsum-">Lorem ipsum 😪</h1>',
        '<h2 id="test-dolorsitamet">dolor—sit—amet</h2>',
        '<h3 id="test-consectetur--adipisicing">consectetur &amp; adipisicing</h3>',
        '<h4 id="test-elit">elit</h4>',
        '<h5 id="test-elit-1">elit</h5>',
        "<p>sed</p>",
      ].join("\n"),
    );
  });
});
