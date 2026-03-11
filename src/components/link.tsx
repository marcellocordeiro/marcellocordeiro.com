import NextLink, { type LinkProps as NextLinkProps } from "next/link";

type LinkProps<RouteType> = NextLinkProps<RouteType>;

export function Link<RouteType>(props: LinkProps<RouteType>) {
  return <NextLink {...props} />;
}
