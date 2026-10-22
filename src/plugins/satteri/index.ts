import { satteri } from "@astrojs/markdown-satteri";

import { satteriHastAutolinkHeadings } from "./hast-autolink-headings";
import { satteriHastExternalLinksPlugin } from "./hast-external-links";
import { satteriHastSlug } from "./hast-slug";
import { satteriMdastModifiedTimePlugin } from "./mdast-modified-time";
import { satteriMdastReadingTimePlugin } from "./mdast-reading-time";

export const markdownProcessor = satteri({
  mdastPlugins: [satteriMdastModifiedTimePlugin(), satteriMdastReadingTimePlugin()],
  hastPlugins: [
    satteriHastExternalLinksPlugin(),
    satteriHastSlug(),
    satteriHastAutolinkHeadings({
      content: { type: "text", value: "#" },
      properties: { className: ["heading-anchor"] },
      headingProperties: { className: ["relative"] },
    }),
  ],
});
