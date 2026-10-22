// Ported from https://github.com/rehypejs/rehype-autolink-headings

import { markdownToHtml } from "satteri";
import { describe, expect, it } from "vitest";

import { satteriHastAutolinkHeadings, type SatteriHastAutolinkHeadingsOptions } from "..";
import { satteriHastSlug } from "../../hast-slug";

const fixtures = [
  {
    name: "behavior-after",
    config: { behavior: "after" },
    input: "# Bar {#foo}",
    output: '<h1 id="foo">Bar</h1><a href="#foo"><span class="icon icon-link"></span></a>',
  },
  {
    name: "behavior-append",
    config: { behavior: "append" },
    input: "# Bar {#foo}",
    output:
      '<h1 id="foo">Bar<a aria-hidden="true" tabindex="-1" href="#foo"><span class="icon icon-link"></span></a></h1>',
  },
  {
    name: "behavior-before",
    config: { behavior: "before" },
    input: "# Bar {#foo}",
    output: '<a href="#foo"><span class="icon icon-link"></span></a><h1 id="foo">Bar</h1>',
  },
  {
    name: "behavior-prepend",
    input: "# Bar {#foo}",
    output:
      '<h1 id="foo"><a aria-hidden="true" tabindex="-1" href="#foo"><span class="icon icon-link"></span></a>Bar</h1>',
  },
  {
    name: "behavior-wrap",
    config: { behavior: "wrap" },
    input: "# Bar {#foo}",
    output: '<h1 id="foo"><a href="#foo">Bar</a></h1>',
  },
  {
    name: "behavior-wrap-content-multiple",
    config: {
      behavior: "wrap",
      content: [
        {
          type: "element",
          tagName: "span",
          properties: { className: ["icon", "icon-link"] },
          children: [],
        },
      ],
    },
    input: "# Bar {#foo}",
    output: '<h1 id="foo"><a href="#foo">Bar<span class="icon icon-link"></span></a></h1>',
  },
  {
    name: "behavior-wrap-content-one",
    config: {
      behavior: "wrap",
      content: {
        type: "element",
        tagName: "span",
        properties: { className: ["icon", "icon-link"] },
        children: [],
      },
    },
    input: "# Bar {#foo}",
    output: '<h1 id="foo"><a href="#foo">Bar<span class="icon icon-link"></span></a></h1>',
  },
  {
    name: "content-multiple",
    config: {
      content: [
        { type: "comment", value: "Foo " },
        { type: "text", value: "bar" },
        { type: "comment", value: " baz" },
      ],
    },
    input: "# Bar {#foo}",
    output:
      '<h1 id="foo"><a aria-hidden="true" tabindex="-1" href="#foo"><!--Foo -->bar<!-- baz--></a>Bar</h1>',
  },
  {
    name: "content-one",
    config: { content: { type: "comment", value: "Tada!" } },
    input: "# Bar {#foo}",
    output: '<h1 id="foo"><a aria-hidden="true" tabindex="-1" href="#foo"><!--Tada!--></a>Bar</h1>',
  },
  {
    name: "default",
    input: `
Alpha

# Charlie {#bravo}

Delta`,
    output: `
<p>Alpha</p>
<h1 id="bravo"><a aria-hidden="true" tabindex="-1" href="#bravo"><span class="icon icon-link"></span></a>Charlie</h1>
<p>Delta</p>`,
  },
  {
    name: "group",
    config: {
      behavior: "before",
      group: {
        type: "element",
        tagName: "div",
        properties: { className: ["heading-group"] },
        children: [],
      },
    },
    input: "# Bar {#foo}",
    output:
      '<div class="heading-group"><a href="#foo"><span class="icon icon-link"></span></a><h1 id="foo">Bar</h1></div>',
  },
  {
    name: "heading-properties",
    config: {
      headingProperties: {
        className: ["foo", "bar", "baz"],
        dataQux: "quux",
      },
    },
    input: "# Bar {#foo}",
    output:
      '<h1 id="foo" class="foo bar baz" data-qux="quux"><a aria-hidden="true" tabindex="-1" href="#foo"><span class="icon icon-link"></span></a>Bar</h1>',
  },
  {
    name: "properties",
    config: {
      properties: {
        className: ["foo", "bar", "baz"],
        dataQux: "quux",
      },
    },
    input: "# Bar {#foo}",
    output:
      '<h1 id="foo"><a class="foo bar baz" data-qux="quux" href="#foo"><span class="icon icon-link"></span></a>Bar</h1>',
  },
  {
    name: "test",
    config: { test: ["h1", "h2"] },
    input: `
# Alpha {#alpha}
## Bravo {#bravo}
### Charlie {#charlie}
#### Delta {#delta}
##### Echo {#echo}
###### Foxtrot {#foxtrot}`,
    output: `
<h1 id="alpha"><a aria-hidden="true" tabindex="-1" href="#alpha"><span class="icon icon-link"></span></a>Alpha</h1>
<h2 id="bravo"><a aria-hidden="true" tabindex="-1" href="#bravo"><span class="icon icon-link"></span></a>Bravo</h2>
<h3 id="charlie">Charlie</h3>
<h4 id="delta">Delta</h4>
<h5 id="echo">Echo</h5>
<h6 id="foxtrot">Foxtrot</h6>`,
  },
] satisfies {
  name: string;
  config?: SatteriHastAutolinkHeadingsOptions;
  input: string;
  output: string;
}[];

describe("satteri-hast-autolink-headings rehype-autolink-headings", () => {
  it.each(fixtures)("$name", async ({ config, input, output }) => {
    const { html } = await markdownToHtml(input, {
      features: { headingAttributes: true },
      hastPlugins: [satteriHastSlug(), satteriHastAutolinkHeadings(config)],
    });

    expect(html.trim()).toBe(output.trim());
  });
});
