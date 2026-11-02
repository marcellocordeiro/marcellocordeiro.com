import { icons } from "@iconify-json/lucide";
import { defineHastPlugin, type HastNode, type HastPluginInput } from "satteri";

import { parseHref } from "@/lib/href-parser";

import { makeHastIcon } from "./utils/icons";

function makeSrSpan(): HastNode {
  return {
    type: "element",
    tagName: "span",
    properties: { className: ["sr-only"] },
    children: [{ type: "text", value: " (opens in a new tab)" }],
  };
}

export function satteriHastExternalLinks(): HastPluginInput {
  // lucide:arrow-up-right
  const externalLinkIcon = makeHastIcon(icons, "arrow-up-right", {
    properties: { "aria-hidden": "true" },
  });
  const srSpan = makeSrSpan();

  return defineHastPlugin({
    name: "satteri-hast-external-links",
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
          ctx.appendChild(node, [externalLinkIcon, srSpan]);
        }
      },
    },
  });
}
