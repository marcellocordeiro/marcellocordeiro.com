import { fromHtml, type Options } from "hast-util-from-html";

import type { Element } from "./types";

const defaultOptions: Options = { fragment: true };

export function htmlStringToHastElement(
  htmlString: string,
  options: Readonly<Options> = defaultOptions,
): Element {
  const hastNode = fromHtml(htmlString, options).children[0];

  if (hastNode === undefined) {
    throw new Error("Unable to create hast node from string");
  }

  if (hastNode.type !== "element") {
    throw new Error("Hast node is not an element");
  }

  return hastNode;
}
