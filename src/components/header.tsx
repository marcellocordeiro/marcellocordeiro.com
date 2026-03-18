"use client";

import { usePathname } from "next/navigation";

import { Container } from "@/components/container";
import { Link } from "@/components/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { sidebarItems } from "@/config/constants";

export function Header() {
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
        <NavigationMenuLink active={isActive(item.href)} render={<Link href={item.href} />}>
          <item.icon />
          <span className="max-sm:hidden">{item.label}</span>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  });

  return (
    <header className="sticky top-0 z-100 flex h-16 items-center justify-between">
      <NavigationMenu className="mx-auto rounded-full bg-accent/70 px-3 py-1 shadow-lg ring ring-accent backdrop-blur-sm">
        <NavigationMenuList>{navigation}</NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
