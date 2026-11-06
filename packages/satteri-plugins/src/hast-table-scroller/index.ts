import { defineHastPlugin, type HastPluginEntry } from "satteri";

export interface SatteriHastTableScrollerOptions {
  prefix?: string;
}

export function satteriHastTableScroller(
  _opts: SatteriHastTableScrollerOptions = {},
): HastPluginEntry {
  return defineHastPlugin({
    name: "satteri-hast-table-scroller",
    element: {
      filter: ["table"],
      visit(node, ctx) {
        ctx.wrapNode(
          node,

          {
            type: "element",
            tagName: "div",
            properties: { className: ["prose-scroll"] },
            children: [],
          },
        );
      },
    },
  });
}
