"use client";

import { usePathname } from "next/navigation";

import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { sidebarItems } from "@/config/constants";
import { MenuClosedIcon, XIcon } from "@/config/icons";

export function Header() {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
}

function DesktopHeader() {
  const pathname = usePathname();

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
      <NavigationMenuItem key={item.href}>
        <NavigationMenuLink active={isActive(item.href)} render={<Link href={item.href} />}>
          <item.icon />
          <span className="max-sm:hidden">{item.label}</span>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  });

  return (
    <header className="sticky top-0 z-100 flex h-16 items-center justify-between max-sm:hidden">
      <NavigationMenu className="mx-auto rounded-full bg-accent/70 px-3 py-1 shadow-lg ring ring-accent backdrop-blur-sm">
        <NavigationMenuList>{navigation}</NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

function MobileHeader() {
  const pathname = usePathname();

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
      <Link key={item.href} href={item.href}>
        <item.icon />
        <span>{item.label}</span>
      </Link>

      // <NavigationMenuItem key={item.href}>
      //   <NavigationMenuLink active={isActive(item.href)} render={}>
      //   </NavigationMenuLink>
      // </NavigationMenuItem>
    );
  });

  return (
    <Collapsible
      render={<header className="sticky top-0 z-100 flex flex-col bg-accent sm:hidden" />}
    >
      <div className="flex h-16 w-full items-center justify-between px-10">
        <p>Marcello's website</p>

        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon">
              <MenuClosedIcon className="absolute size-5 transition-all duration-200 group-data-panel-open/button:rotate-90 group-data-panel-open/button:opacity-0" />
              <XIcon className="absolute size-5 transition-all duration-200 not-group-data-panel-open/button:-rotate-90 not-group-data-panel-open/button:opacity-0" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          }
        />
      </div>

      <CollapsibleContent className="absolute top-full w-full bg-accent px-10">
        {navigation}
      </CollapsibleContent>
    </Collapsible>
  );
}
