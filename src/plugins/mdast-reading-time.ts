import getReadingTime from "reading-time";
import { defineMdastPlugin } from "satteri";

export const mdastReadingTimePlugin = defineMdastPlugin({
  name: "mdast-reading-time",
  after(root, ctx) {
    const textOnPage = ctx.textContent(root);
    const readingTime = getReadingTime(textOnPage);

    if (ctx.data.astro !== undefined) {
      // readingTime.text will give us minutes read as a friendly string,
      // i.e. "3 min read"
      ctx.data.astro.frontmatter.minutesRead = readingTime.text;
    }
  },
});
