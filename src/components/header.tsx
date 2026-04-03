import { useState } from "react";

import { Link } from "@/components/link";
import { Button } from "@/components/ui/button/button";
import { AUTHOR, NAV_ITEMS } from "@/config/constants";
import { MenuClosedIcon, MenuOpenIcon } from "@/config/icons";
import { cn } from "@/lib/utils";
import type { Route } from "@/types";

interface Props {
  pathname: string;
}

export function Header({ pathname }: Props) {
  const [openSheet, setOpenSheet] = useState(false);

  const isActive = (href: Route) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const navigation = NAV_ITEMS.map((item) => {
    return (
      <li className="not-sm:w-full" key={item.href}>
        <Link
          className={cn(
            "block rounded-3xl px-3 py-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-1 data-[active=true]:bg-muted/50 data-[active=true]:hover:bg-muted data-[active=true]:focus:bg-muted",
          )}
          href={item.href}
          data-active={isActive(item.href)}
          aria-label={item.label}
          aria-current={isActive(item.href) && "page"}
        >
          {item.label}
        </Link>
      </li>
    );
  });

  return (
    <header className="sticky top-0 z-20 w-full border-b bg-background/80 backdrop-blur">
      <nav className="min-h-header mx-auto flex max-w-3xl flex-wrap items-center justify-between p-4">
        <Link href="/">
          <span className="text-xl font-semibold whitespace-nowrap">{AUTHOR.name}</span>
        </Link>

        <Button
          className={cn(
            "transition-transform duration-200 md:hidden",
            openSheet ? "rotate-90" : "rotate-0",
          )}
          variant="outline"
          size="icon"
          aria-label={openSheet ? "Close menu" : "Open menu"}
          aria-expanded={openSheet}
          aria-controls="mobile-nav"
          onClick={() => setOpenSheet((value) => !value)}
        >
          {openSheet ? <MenuOpenIcon /> : <MenuClosedIcon />}
        </Button>

        <div
          className="hidden w-full data-[expanded=true]:block md:block md:w-auto"
          id="mobile-nav"
          aria-hidden={!openSheet}
          data-expanded={openSheet}
        >
          <ul className="flex rounded font-medium not-md:mt-4 not-md:flex-col not-md:border not-md:bg-background/80 not-md:p-4 md:space-x-8">
            {navigation}
          </ul>
        </div>
      </nav>
    </header>
  );

  /*
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <NavigationMenu className="h-header mx-auto max-w-3xl justify-between px-10">
        <Link className="text-xl font-semibold whitespace-nowrap" href="/">
          {AUTHOR.name}
        </Link>

        <NavigationMenuList className="flex justify-end gap-2 not-sm:hidden">
          {navigation}
        </NavigationMenuList>

        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetTrigger
            className="sm:hidden"
            render={
              <Button variant="ghost" size="icon">
                <MenuClosedIcon />
              </Button>
            }
          />

          <SheetContent className="p-10" side="top">
            <NavigationMenuList className="flex-col">{navigation}</NavigationMenuList>
          </SheetContent>
        </Sheet>
      </NavigationMenu>
    </header>
  );
  */
}
