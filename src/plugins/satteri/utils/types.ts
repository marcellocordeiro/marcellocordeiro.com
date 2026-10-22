import { type HastNode } from "satteri";

export type Element = Extract<HastNode, { type: "element" }>;
export type ElementContent = Element["children"][number];
export type Properties = Element["properties"];
