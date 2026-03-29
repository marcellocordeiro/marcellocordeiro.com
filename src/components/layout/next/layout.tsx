"use client";

import { usePathname } from "next/navigation";

import { Layout as LayoutPrimitive } from "@/components/layout";

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Why is this sometimes returning `string | null`?
  const pathname = usePathname();

  return <LayoutPrimitive pathname={pathname ?? ""}>{children}</LayoutPrimitive>;
}
