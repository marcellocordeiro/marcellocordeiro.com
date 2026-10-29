import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { defineMdastPlugin } from "satteri";

export function satteriMdastModifiedTime() {
  return defineMdastPlugin({
    name: "satteri-mdast-modified-time",
    before(_root, ctx) {
      if (!ctx.fileURL) {
        return;
      }

      const filepath = fileURLToPath(ctx.fileURL);
      // %cI committer date, strict ISO 8601 format
      // %cs committer date, short format `YYYY-MM-DD`
      const command = `git log -1 --pretty="format:%cI" "${filepath}"`;

      // oxlint-disable-next-line node/no-sync
      const result = execSync(command).toString().trim();

      if (result === "") {
        return;
      }

      const date = new Date(result);

      if (ctx.data.astro !== undefined) {
        ctx.data.astro.frontmatter["lastModified"] = date;
      }
    },
  });
}
