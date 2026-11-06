import type { IconifyJSON } from "@iconify/types";
import { getIconData, iconToHTML, iconToSVG, type IconifyIconCustomisations } from "@iconify/utils";

import { htmlStringToHastElement } from "./hast";
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

  const hastNode = htmlStringToHastElement(svg, { fragment: true, space: "svg" });

  if (hastNode.tagName !== "svg") {
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
