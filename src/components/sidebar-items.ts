import {
  FolderKanbanIcon,
  HouseIcon,
  type LucideIcon,
  NewspaperIcon,
} from "lucide-react";
import type { Route } from "next";

interface SidebarItem {
  href: Route;
  label: string;
  icon: LucideIcon;
}

export const sidebarItems: Array<SidebarItem> = [
  {
    href: "/",
    label: "Home",
    icon: HouseIcon,
  },
  {
    href: "/blog",
    label: "Blog",
    icon: NewspaperIcon,
  },
  {
    href: "/projects",
    label: "Projects",
    icon: FolderKanbanIcon,
  },
];
