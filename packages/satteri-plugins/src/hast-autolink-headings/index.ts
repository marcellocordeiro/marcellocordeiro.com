import { defineHastPlugin, type HastPluginInput } from "satteri";

import type { Element, ElementContent, Properties } from "../utils/types";

type Behavior = "after" | "append" | "before" | "prepend" | "wrap";
type BuildProperties = (element: Readonly<Element>) => Readonly<Properties>;
type Build = (element: Readonly<Element>) => Readonly<ElementContent> | readonly ElementContent[];
type BuildGroup = (element: Readonly<Element>) => Readonly<Element>;

export interface SatteriHastAutolinkHeadingsOptions {
  behavior?: Behavior;
  content?: Readonly<ElementContent> | readonly ElementContent[] | Build;
  group?: Readonly<Element> | BuildGroup;
  headingProperties?: Readonly<Properties> | BuildProperties;
  properties?: Readonly<Properties> | BuildProperties;
  test?: string[];
}

export function satteriHastAutolinkHeadings(
  opts: SatteriHastAutolinkHeadingsOptions = {},
): HastPluginInput {
  const behavior = opts.behavior ?? "prepend";
  const test = opts.test ?? ["h1", "h2", "h3", "h4", "h5", "h6"];

  type Method<T> = (
    node: Readonly<Element>,
    content: readonly ElementContent[],
    headingProperties: Readonly<Properties>,
    properties: Readonly<Properties>,
  ) => T;

  // oxlint-disable-next-line unicorn/consistent-function-scoping
  const wrap: Method<Element> = (node, content, headingProperties, properties) => {
    const anchor = makeAnchor(properties, [...node.children, ...content]);
    const heading = makeElement(node.tagName, { ...node.properties, ...headingProperties }, [
      anchor,
    ]);

    return heading;
  };

  const inject: Method<Element> = (node, content, headingProperties, properties) => {
    const anchor = makeAnchor(properties, content);
    const heading = makeElement(
      node.tagName,
      { ...node.properties, ...headingProperties },
      behavior === "prepend" ? [anchor, ...node.children] : [...node.children, anchor],
    );

    return heading;
  };

  const around: Method<ElementContent[]> = (node, content, headingProperties, properties) => {
    const anchor = makeAnchor(properties, content);
    const heading = makeElement(
      node.tagName,
      { ...node.properties, ...headingProperties },
      node.children,
    );

    return behavior === "before" ? [anchor, heading] : [heading, anchor];
  };

  return defineHastPlugin({
    name: "satteri-hast-autolink-headings",
    element: {
      filter: test,
      visit(node, ctx) {
        // Ignore headings without an id
        const { id } = node.properties;
        if (typeof id !== "string" || id === "") {
          return;
        }

        const content = buildContent(behavior, opts.content, node);
        const properties = buildProperties(behavior, opts.properties, id, node);
        const headingProperties = buildHeadingProperties(opts.headingProperties, node);

        if (behavior === "wrap") {
          const result = wrap(node, content, headingProperties, properties);
          ctx.replaceNode(node, result);

          return;
        }

        if (behavior === "prepend" || behavior === "append") {
          const result = inject(node, content, headingProperties, properties);
          ctx.replaceNode(node, result);

          return;
        }

        // oxlint-disable-next-line typescript/no-unnecessary-condition -- for readability
        if (behavior === "before" || behavior === "after") {
          const nodes = around(node, content, headingProperties, properties);

          if (opts.group === undefined) {
            ctx.replaceNode(node, nodes);
          } else {
            const group = buildAndCloneIfNeeded(opts.group, node);

            ctx.replaceNode(node, {
              ...group,
              children: nodes,
            });
          }
        }
      },
    },
  });
}

// Defaults

const DEFAULT_CONTENT: Element = {
  type: "element",
  tagName: "span",
  properties: { className: ["icon", "icon-link"] },
  children: [],
};

const DEFAULT_PROPERTIES: Record<Behavior, Properties> = {
  after: {},
  append: { ariaHidden: "true", tabIndex: -1 },
  before: {},
  prepend: { ariaHidden: "true", tabIndex: -1 },
  wrap: {},
};

// Unwrap fn -> T to T

function buildContent(
  behavior: Behavior,
  content: readonly ElementContent[] | Readonly<ElementContent> | Build | undefined,
  node: Readonly<Element>,
): readonly ElementContent[] {
  if (content === undefined) {
    return behavior === "wrap" ? [] : [DEFAULT_CONTENT];
  }

  const result = buildAndCloneIfNeeded(content, node);

  return isArray(result) ? result : [result];
}

function buildProperties(
  behavior: Behavior,
  properties: Readonly<Properties> | BuildProperties | undefined,
  id: string,
  node: Readonly<Element>,
): Readonly<Properties> {
  return {
    ...buildAndCloneIfNeeded(properties ?? DEFAULT_PROPERTIES[behavior], node),
    href: `#${id}`,
  };
}

function buildHeadingProperties(
  headingProperties: Readonly<Properties> | BuildProperties | undefined,
  node: Readonly<Element>,
): Readonly<Properties> {
  if (headingProperties === undefined) {
    return {};
  }

  return buildAndCloneIfNeeded(headingProperties, node);
}

// Create elements

function makeAnchor(properties: Properties, children: readonly ElementContent[]): Element {
  return makeElement("a", properties, children);
}

function makeElement(
  tagName: string,
  properties: Readonly<Properties>,
  children: readonly ElementContent[],
): Element {
  return {
    type: "element",
    tagName,
    properties,
    children: [...children],
  };
}

// Helpers

function buildAndCloneIfNeeded<T>(value: T | Builder<T>, node: Readonly<Element>): T {
  if (isBuilder(value)) {
    return value(node);
  }

  return structuredClone(value);
}

function isArray(
  arg: Readonly<ElementContent> | readonly ElementContent[],
): arg is readonly ElementContent[] {
  return Array.isArray(arg);
}

type Builder<T> = (node: Readonly<Element>) => T;

function isBuilder<T>(value: T | Builder<T>): value is Builder<T> {
  return typeof value === "function";
}
