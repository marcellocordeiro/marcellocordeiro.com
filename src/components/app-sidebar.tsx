"use client";

import { usePathname } from "next/navigation";

import { Link } from "@/components/link";
import { ModeToggle } from "@/components/mode-toggle";
import { sidebarItems } from "@/components/sidebar-items";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const navigation = sidebarItems.map((item) => {
    return (
      <SidebarMenuItem key={item.href}>
        <SidebarMenuButton
          isActive={isActive(item.href)}
          render={<Link href={item.href} />}
        >
          <item.icon />
          <span>{item.label}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  });

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader>Marcello Cordeiro</SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>{navigation}</SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="ml-auto">
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
