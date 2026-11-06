import katex from "katex";
import {
  defineMdastPlugin,
  type MdastNode,
  type MdastPluginEntry,
  type RawMdastContent,
} from "satteri";

export interface SatteriMdastMathOptions {
  passthrough?: boolean;
}

export function satteriMdastMath(opts: SatteriMdastMathOptions = {}): MdastPluginEntry {
  if (opts.passthrough ?? false) {
    return undefined;
  }

  return defineMdastPlugin({
    name: "satteri-mdast-math",

    // Matches
    // $...$
    inlineMath(node, ctx) {
      if (ctx.data.astro !== undefined) {
        ctx.data.astro.frontmatter["hasMath"] = true;
      }

      return render(node.value, false);
    },

    // Matches
    // $$
    //
    // $$
    math(node, ctx) {
      if (ctx.data.astro !== undefined) {
        ctx.data.astro.frontmatter["hasMath"] = true;
      }

      return render(node.value, true);
    },

    // Matches
    // ```math
    //
    // ```
    code(node, ctx) {
      if (node.lang !== "math") {
        return;
      }

      if (ctx.data.astro !== undefined) {
        ctx.data.astro.frontmatter["hasMath"] = true;
      }

      // The `code` node transforms to <pre><code>...</code></pre>,
      // so transform it to a `math` node instead to simplify the hast transformations
      // ctx.replaceNode(node, {
      //   type: "math",
      //   value: node.value,
      // });

      return render(node.value, true);
    },
  });
}

function render(value: string, displayMode: boolean): RawMdastContent | MdastNode {
  const htmlString = katex.renderToString(value, { displayMode, output: "htmlAndMathml" });

  // Won't wrap the node in <p>...</p>
  // return {
  //   type: "html",
  //   value: htmlString,
  // };

  // Will wrap the node in <p>...</p>
  return {
    raw: htmlString,
    mdxExpressions: false,
  };
}
