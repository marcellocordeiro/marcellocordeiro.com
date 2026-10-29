import { icons } from "@iconify-json/lucide";
import { getIconData, iconToHTML, iconToSVG } from "@iconify/utils";
import { fromHtml } from "hast-util-from-html";
import { defineHastPlugin, type HastNode, type HastPluginInput } from "satteri";

import { parseHref } from "@/lib/href-parser";

function makeExternalLinkIcon(): HastNode {
  // lucide:arrow-up-right
  const iconData = getIconData(icons, "arrow-up-right");

  if (!iconData) {
    throw new Error("Icon does not exist");
  }

  const renderData = iconToSVG(iconData);
  const svg = iconToHTML(renderData.body, renderData.attributes);

  const hastNode = fromHtml(svg, { fragment: true, space: "svg" }).children[0];

  if (!hastNode) {
    throw new Error("Unable to create hast node from icon");
  }

  return hastNode;
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
