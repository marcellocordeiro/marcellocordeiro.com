import { markdownToHtml } from "satteri";
import { it, describe, expect } from "vitest";

import { satteriHastTableScroller } from "..";

async function transform(
  markdown: string,
  options?: Parameters<typeof satteriHastTableScroller>[0],
) {
  const { html } = await markdownToHtml(markdown, {
    hastPlugins: [satteriHastTableScroller(options)],
  });
  return html.trim();
}

describe("satteri-hast-table-scroller", () => {
  it("should wrap tables in a scrollable div", async () => {
    const input = `
| A | B |
| - | - |
| 1 | 2 |
| 3 | 4 |
`;

    const output = `
<div class="prose-scroll"><table>
<thead>
<tr>
<th>A</th>
<th>B</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>2</td>
</tr>
<tr>
<td>3</td>
<td>4</td>
</tr>
</tbody>
</table></div>
`.trim();

    const html = await transform(input);
    expect(html).toBe(output);
  });
});
