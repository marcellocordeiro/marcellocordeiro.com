import { icons } from "@iconify-json/octicon";
import { defineMdastPlugin, type MdastPluginEntry } from "satteri";

import { makeHastElement } from "../utils/icons";
import type { Properties } from "../utils/types";

export interface SatteriMdastGithubAlertsOptions {
  properties?: Readonly<Properties>;
  iconProperties?: Readonly<Properties>;
  passthrough?: boolean;
}

// https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts
// Also known as callouts or admonitions
export function satteriMdastGithubAlerts(
  opts: SatteriMdastGithubAlertsOptions = {},
): MdastPluginEntry {
  if (opts.passthrough ?? false) {
    return undefined;
  }
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  const markers = Object.keys(mappings) as (keyof typeof mappings)[];

  return defineMdastPlugin({
    name: "satteri-mdast-alerts",
    blockquote(node, context) {
      const [firstChild] = node.children;

      if (firstChild?.type !== "paragraph") {
        return;
      }

      const [firstParagraphChild, ...restParagraphChildren] = firstChild.children;

      // For now, ignore if the paragraph child isn't "text" or if there are more than one child.
      // Is it even possible to have more than one child???
      if (firstParagraphChild?.type !== "text" || restParagraphChildren.length > 0) {
        return;
      }

      const firstText = firstParagraphChild.value;

      const match = MARKER_REGEX.exec(firstText);
      if (match?.groups?.["marker"] === undefined) {
        return;
      }

      const wholeMatch = match[0];
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const marker = match.groups["marker"] as Marker;

      if (!markers.includes(marker)) {
        return;
      }

      if (wholeMatch === firstText) {
        context.removeNode(firstChild);
      } else {
        context.setField(firstParagraphChild, "value", firstText.replace(wholeMatch, ""));
      }

      context.prependChild(node, {
        type: "paragraph",
        data: {
          hProperties: {
            className: ["markdown-alert-title"],
          },
          hChildren: [
            mappings[marker].icon,
            {
              type: "text",
              value: mappings[marker].title,
            },
          ],
        },
      });

      const { className = [], ...restProperties } = opts.properties ?? {};

      const hProperties = {
        className: [mappings[marker].className, ...className].filter(Boolean),
        ...restProperties,
      };

      context.setProperty(node, "data", {
        ...node.data,
        hName: "div",
        hProperties,
      });
    },
  });
}

const MARKER_REGEX = /^\[!(?<marker>NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][^\S\r\n]*(?:\r?\n|$)/;

type Marker = keyof typeof mappings;

function makeOcticonIcon(name: string) {
  const className = ["octicon", `octicon-${name}`, "mr-2"];

  return makeHastElement(icons, `${name}-16`, {
    customisations: { width: 16, height: 16 },
    properties: { className, "aria-hidden": "true" },
  });
}

const mappings = {
  NOTE: {
    className: "markdown-alert markdown-alert-note",
    title: "Note",
    icon: makeOcticonIcon("info"), // octicon:info-16
  },
  TIP: {
    className: "markdown-alert markdown-alert-tip",
    title: "Tip",
    icon: makeOcticonIcon("light-bulb"), // octicon:light-bulb-16
  },
  IMPORTANT: {
    className: "markdown-alert markdown-alert-important",
    title: "Important",
    icon: makeOcticonIcon("report"), //  octicon:report-16
  },
  WARNING: {
    className: "markdown-alert markdown-alert-warning",
    title: "Warning",
    icon: makeOcticonIcon("alert"), // octicon:alert-16
  },
  CAUTION: {
    className: "markdown-alert markdown-alert-caution",
    title: "Caution",
    icon: makeOcticonIcon("stop"), // octicon:stop-16
  },
} as const;
