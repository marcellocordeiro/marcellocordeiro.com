import type { Route } from "next";

import {
  GitHubIcon,
  HouseIcon,
  type IconType,
  LinkedInIcon,
  NewspaperIcon,
  RssIcon,
} from "@/config/icons";

export const info = {
  firstName: "Marcello",
  lastName: "Cordeiro",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/marcellocordeiro",
      icon: GitHubIcon,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/marcello-cordeiro",
      icon: LinkedInIcon,
    },
  ],
  sourceCode: "https://github.com/marcellocordeiro/marcellocordeiro.com",
};

interface SidebarItem {
  href: Route;
  label: string;
  icon: IconType;
}

export const sidebarItems: SidebarItem[] = [
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
    href: "/rss.xml",
    label: "RSS",
    icon: RssIcon,
  },
];
