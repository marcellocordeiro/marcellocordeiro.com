import NextLink, { type LinkProps as NextLinkProps } from "next/link";

import { ExternalLinkIcon } from "@/config/icons";
import { cn } from "@/lib/utils";

export interface LinkProps<RouteType> extends NextLinkProps<RouteType> {
  showExternalLinkIcon?: boolean;
}

export function Link<RouteType>({
  className,
  children,
  href,
  rel,
  target,
  prefetch = false,
  showExternalLinkIcon,
  ...props
}: LinkProps<RouteType>) {
  const isExternal = __isExternal(href);
  const resolvedShowExternalLinkIcon = showExternalLinkIcon ?? isExternal;

  return (
    <NextLink
      className={cn(
        resolvedShowExternalLinkIcon && "inline-flex place-items-center gap-1",
        className,
      )}
      href={href}
      rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
      target={target ?? (isExternal ? "_blank" : undefined)}
      prefetch={prefetch}
      {...props}
    >
      {children}
      {resolvedShowExternalLinkIcon && <ExternalLinkIcon />}
    </NextLink>
  );
}

function __isExternal<RouteType>(href: LinkProps<RouteType>["href"]): boolean {
  if (typeof href === "string") {
    return !(href.startsWith("/") || href.startsWith("?") || href.startsWith("#"));
  } else if (typeof href === "object") {
    return false;
  }

  return href; // never
}
