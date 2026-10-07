import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { defineMdastPlugin } from "satteri";

export const mdastModifiedTimePlugin = defineMdastPlugin({
  name: "mdast-modified-time",
  before(_root, ctx) {
    if (!ctx.fileURL) {
      return;
    }

    const filepath = fileURLToPath(ctx.fileURL);
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);

    if (ctx.data.astro !== undefined) {
      ctx.data.astro.frontmatter.lastModified = result.toString();
    }
  },
});
