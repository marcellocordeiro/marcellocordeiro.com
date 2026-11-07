import { defineMdastPlugin, type MdastPluginEntry } from "satteri";

export interface SatteriMdastMermaidOptions {
  passthrough?: boolean;
}

export function satteriMdastMermaid(opts: SatteriMdastMermaidOptions = {}): MdastPluginEntry {
  if (opts.passthrough ?? false) {
    return undefined;
  }

  return defineMdastPlugin({
    name: "satteri-mdast-mermaid",
    code(node, _ctx) {
      if (node.lang !== "mermaid") {
        return;
      }

      // TODO: wait for mermaid v13? In the meantime we can use svgs
    },
  });
}
