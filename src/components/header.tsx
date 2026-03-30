"use client";

import { useState } from "react";

import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AUTHOR, NAV_ITEMS } from "@/config/constants";
import { MenuClosedIcon } from "@/config/icons";
import type { Route } from "@/types";

export interface HeaderProps {
  pathname: string;
}

export function Header({ pathname }: HeaderProps) {
  const [openSheet, setOpenSheet] = useState(false);

  const isActive = (href: Route) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const navigation = NAV_ITEMS.map((item) => {
    return (
      <NavigationMenuItem className="not-sm:w-full" key={item.href}>
        <NavigationMenuLink
          active={isActive(item.href)}
          render={<Link href={item.href} aria-label={item.label} />}
        >
          {item.label}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  });

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
}
