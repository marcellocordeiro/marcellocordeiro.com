"use client";

import { usePathname } from "next/navigation";

import { Link } from "@/components/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { sidebarItems } from "@/config/constants";

export function AppHeader() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const navigation = sidebarItems.map((item) => {
    return (
      <NavigationMenuItem key={item.href}>
        <NavigationMenuLink
          className={navigationMenuTriggerStyle()}
          active={isActive(item.href)}
          render={<Link href={item.href} />}
        >
          <item.icon />
          <span className="max-sm:hidden">{item.label}</span>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  });

  return (
    <header className="sticky top-0 flex h-14 shrink-0 items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2 rounded border bg-background/70 px-3 py-1">
        <NavigationMenu>
          <NavigationMenuList>{navigation}</NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
