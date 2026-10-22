import GithubSlugger from "github-slugger";
import { defineHastPlugin, type HastPluginInput } from "satteri";

export interface SatteriHastSlugOptions {
  prefix?: string;
}

export function satteriHastSlug(opts: SatteriHastSlugOptions = {}): HastPluginInput {
  const prefix = opts.prefix ?? "";

  return () => {
    // Resets the counter for each file
    const slugger = new GithubSlugger();

    return defineHastPlugin({
      name: "satteri-hast-slug",
      element: {
        filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
        visit(node, ctx) {
          // Ignore if ids were already assigned
          if (node.properties.id !== undefined) {
            return;
          }

          const text = ctx.textContent(node);
          const id = prefix + slugger.slug(text);

          ctx.setProperty(node, "id", id);
        },
      },
    });
  };
}
