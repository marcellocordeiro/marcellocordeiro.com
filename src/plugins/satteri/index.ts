import { satteri } from "@astrojs/markdown-satteri";

import { hastExternalLinksPlugin } from "./hast-external-links";
import { mdastModifiedTimePlugin } from "./mdast-modified-time";
import { mdastReadingTimePlugin } from "./mdast-reading-time";

export const markdownProcessor = satteri({
  mdastPlugins: [mdastModifiedTimePlugin, mdastReadingTimePlugin],
  hastPlugins: [hastExternalLinksPlugin],
});
