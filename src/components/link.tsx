import NextLink, { type LinkProps as NextLinkProps } from "next/link";

import { cn } from "@/lib/utils";

type LinkProps<RouteType> = NextLinkProps<RouteType>;

export function Link<RouteType>({
  className,
  children,
  ...props
}: LinkProps<RouteType>) {
  return (
    <NextLink className={cn(className)} {...props}>
      {children}
    </NextLink>
  );
}

type ExternalLinkProps = React.ComponentProps<"a">;

export function ExternalLink({
  className,
  children,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      className={cn(className)}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      {children}
    </a>
  );
}
