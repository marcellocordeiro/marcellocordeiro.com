import { cn } from "cn";
import { useState } from "react";

import { HeaderNavigationItems } from "@/components/header/HeaderNavigationItems";
import { Link } from "@/components/Link";
import { Button } from "@/components/ui/button/Button";
import { AUTHOR } from "@/config/constants";
import { MenuClosedIcon, MenuOpenIcon } from "@/config/icons";

interface Props {
  className: string;
  pathname: string;
}

export function MobileHeader({ className, pathname }: Props) {
  const [expandMobileNav, setExpandMobileNav] = useState(false);

  return (
    <header className={cn("border-b bg-background/80 backdrop-blur", className)}>
      <div className="min-h-header flex max-w-3xl items-center justify-between px-4">
        <Link className="text-xl font-semibold" href="/">
          {AUTHOR.name}
        </Link>

        <Button
          className={cn(
            "transition-transform duration-200",
            expandMobileNav ? "rotate-90" : "rotate-0",
          )}
          variant="outline"
          size="icon"
          aria-label={expandMobileNav ? "Close menu" : "Open menu"}
          aria-expanded={expandMobileNav}
          aria-controls="mobile-nav"
          onClick={() => {
            setExpandMobileNav((current) => !current);
          }}
        >
          {expandMobileNav ? <MenuOpenIcon /> : <MenuClosedIcon />}
        </Button>
      </div>

      <nav
        className="hidden data-[expanded=true]:block"
        id="mobile-nav"
        data-expanded={expandMobileNav}
      >
        <ul className="flex flex-col px-6 pb-4 font-medium">
          <HeaderNavigationItems pathname={pathname} />
        </ul>
      </nav>
    </header>
  );
}
