import { ExternalLinkIcon } from "@/config/icons";
import { cn } from "@/lib/utils";

export interface LinkProps extends React.ComponentProps<"a"> {
  showExternalLinkIcon?: boolean;
}

export function Link({
  className,
  children,
  href,
  rel,
  target,
  showExternalLinkIcon,
  ...props
}: LinkProps) {
  const isExternal = __isExternal(href);
  const resolvedShowExternalLinkIcon = showExternalLinkIcon ?? isExternal;

  return (
    <a
      className={cn(
        resolvedShowExternalLinkIcon && "inline-flex place-items-center gap-1",
        className,
      )}
      href={href}
      rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
      target={target ?? (isExternal ? "_blank" : undefined)}
      {...props}
    >
      {children}
      {resolvedShowExternalLinkIcon && <ExternalLinkIcon />}
    </a>
  );
}

function __isExternal(href: LinkProps["href"]): boolean {
  if (href === undefined) {
    return false;
  }

  return !(href.startsWith("/") || href.startsWith("?") || href.startsWith("#"));
}
