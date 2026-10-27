export interface AnchorProps {
  isExternal: boolean;
  rel?: string;
  target?: string;
}

export function parseHref(href: string): AnchorProps {
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
