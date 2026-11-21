import { defineHastPlugin, type HastPluginEntry } from "satteri";

import { parseHref } from "@/lib/href-parser";

export function satteriHastExternalLinks(): HastPluginEntry {
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
          ctx.setProperty(node, "class", "link external-link");
          ctx.setProperty(node, "rel", rel);
          ctx.setProperty(node, "target", target);
        }
      },
    },
  });
}
