import { cn } from "cn";

import { ExternalLinkIcon } from "@/config/icons";
import { parseHref } from "@/lib/href-parser";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  showExternalLinkIcon?: boolean;
}

export function Link({ className, href, showExternalLinkIcon, children, ...props }: Props) {
  const { isExternal, ...propsFromHref } = parseHref(href);

  const resolvedShowExternalLinkIcon = showExternalLinkIcon ?? isExternal;

  return (
    <a
      className={cn(
        resolvedShowExternalLinkIcon && "inline-flex place-items-center gap-1",
        className,
      )}
      href={href}
      {...propsFromHref}
      {...props}
    >
      {children}

      {resolvedShowExternalLinkIcon && (
        <>
          <ExternalLinkIcon aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      )}
    </a>
  );
}
