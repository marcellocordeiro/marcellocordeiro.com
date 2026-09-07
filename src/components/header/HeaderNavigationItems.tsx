import { Link } from "@/components/Link";
import { NAV_ITEMS } from "@/config/navigation-items";

interface Props {
  className?: string;
  pathname: string;
}

export function HeaderNavigationItems({ className, pathname }: Props) {
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {NAV_ITEMS.map((item) => (
        <li key={item.href} className={className}>
          <Link
            className="block rounded-3xl px-3 py-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-1 data-[active=true]:bg-muted/50 data-[active=true]:hover:bg-muted data-[active=true]:focus:bg-muted"
            href={item.href}
            data-active={isActive(item.href)}
            aria-label={item.label}
            aria-current={isActive(item.href) && "page"}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </>
  );
}
