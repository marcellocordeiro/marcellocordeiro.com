"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppHeader() {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }

  return (
    <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 border-b bg-background">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />

        <Separator orientation="vertical" className="mr-2" />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">
                Marcello Cordeiro
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
