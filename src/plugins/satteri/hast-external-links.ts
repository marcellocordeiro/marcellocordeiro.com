import { defineHastPlugin, type HastNode } from "satteri";

import { parseHref } from "@/lib/href-parser";

// Copied straight from lucide check
function makeExternalLinkIcon(): HastNode {
  return {
    type: "element",
    tagName: "svg",
    properties: {
      className: [""],
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      width: "1em",
      height: "1em",
    },
    children: [
      {
        type: "element",
        tagName: "path",
        properties: {
          fill: "none",
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M7 7h10v10M7 17L17 7",
        },
        children: [],
      },
    ],
  };
}

function makeSrSpan(): HastNode {
  return {
    type: "element",
    tagName: "span",
    properties: { className: ["sr-only"] },
    children: [{ type: "text", value: "(opens in a new tab)" }],
  };
}

export const hastExternalLinksPlugin = defineHastPlugin({
  name: "hast-external-links",
  element: {
    filter: ["a"],
    visit(node, ctx) {
      if (node.properties.href === undefined) {
        return;
      }

      const { isExternal, rel, target } = parseHref(node.properties.href);

      if (isExternal) {
        ctx.setProperty(node, "class", "inline-flex place-items-center gap-1");
        ctx.setProperty(node, "rel", rel);
        ctx.setProperty(node, "target", target);
        ctx.appendChild(node, [makeExternalLinkIcon(), makeSrSpan()]);
      }
    },
  },
});
