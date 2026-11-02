import type { IconifyJSON } from "@iconify/types";
import { getIconData, iconToHTML, iconToSVG, type IconifyIconCustomisations } from "@iconify/utils";
import { fromHtml } from "hast-util-from-html";

import type { Element, Properties } from "./types";

interface Options {
  customisations?: IconifyIconCustomisations;
  properties?: Readonly<Properties>;
}

export function makeHastElement(
  iconsData: IconifyJSON,
  iconName: string,
  { customisations, properties }: Options = {},
): Element {
  const iconData = getIconData(iconsData, iconName);

  if (!iconData) {
    throw new Error(`Icon '${iconName}' does not exist`);
  }

  const renderData = iconToSVG(iconData, customisations);
  const svg = iconToHTML(renderData.body, renderData.attributes);

  const hastNode = fromHtml(svg, { fragment: true, space: "svg" }).children[0];

  if (!hastNode) {
    throw new Error("Unable to create hast node from icon");
  }

  if (hastNode.type !== "element" || hastNode.tagName !== "svg") {
    throw new Error("Hast node is not an SVG element");
  }

  if ("className" in hastNode.properties) {
    console.warn(
      "Warning: 'className' property is already set on the hast node. It will be overwritten.",
    );
  }

  hastNode.properties = {
    ...hastNode.properties,
    ...properties,
  };

  return hastNode;
}
