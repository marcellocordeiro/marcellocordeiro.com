"use client";

import { usePathname } from "next/navigation";
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
import { sidebarItems } from "@/config/constants";
import { MenuClosedIcon } from "@/config/icons";

export function Header() {
  const pathname = usePathname();
  const [openSheet, setOpenSheet] = useState(false);

  const isActive = (href: string) => {
    if (pathname === null) {
      return false;
    }

    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const navigation = sidebarItems.map((item) => {
    return (
      <NavigationMenuItem className="not-sm:w-full" key={item.href}>
        <NavigationMenuLink
          active={isActive(item.href)}
          render={<Link href={item.href} onClick={() => setOpenSheet(false)} />}
        >
          <item.icon />
          <span>{item.label}</span>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  });

  return (
    <header className="sticky top-0 z-10 border-b bg-accent/50 shadow-lg backdrop-blur-xl">
      <NavigationMenu className="mx-auto h-16 max-w-3xl justify-between px-10">
        <Link href="/">{`Marcello's website`}</Link>

        <NavigationMenuList className="justify-end not-sm:hidden">{navigation}</NavigationMenuList>

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
