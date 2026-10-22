import { icons } from "@iconify-json/lucide";
import { defineHastPlugin, type HastNode, type HastPluginInput } from "satteri";

import { parseHref } from "@/lib/href-parser";

function makeExternalLinkIcon(): HastNode {
  const icon = icons.icons["arrow-up-right"];

  if (icon === undefined) {
    throw new Error("Icon not found");
  }

  return {
    type: "element",
    tagName: "svg",
    properties: {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      width: "1em",
      height: "1em",
    },
    children: [
      {
        type: "raw",
        value: icon.body,
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

export function satteriHastExternalLinksPlugin(): HastPluginInput {
  const externalLinkIcon = makeExternalLinkIcon();
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
