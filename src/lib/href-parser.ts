export interface Href {
  isExternal: boolean;
  rel?: string;
  target?: string;
}

export function parseHref(href: string): Href {
  if (href.startsWith("/") || href.startsWith("?") || href.startsWith("#")) {
    return {
      isExternal: false,
    };
  }

  return {
    isExternal: true,
    rel: "noopener noreferrer",
    target: "_blank",
  };
}
