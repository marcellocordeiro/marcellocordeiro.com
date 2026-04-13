import { AUTHOR, GITHUB_URL, LINKEDIN_URL, SOURCE_CODE } from "./constants";
import {
  EmailIcon,
  GitHubIcon,
  HouseIcon,
  LinkedInIcon,
  NewspaperIcon,
  RssIcon,
} from "./icons.svelte";

export const SOCIALS = [
  {
    href: GITHUB_URL,
    label: "GitHub",
    icon: GitHubIcon,
  },
  {
    href: LINKEDIN_URL,
    label: "LinkedIn",
    icon: LinkedInIcon,
  },
  {
    href: `mailto:${AUTHOR.email}`,
    label: "Email",
    icon: EmailIcon,
  },
] as const;

export const NAV_ITEMS = [
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
] as const;

export const FOOTER_ITEMS = {
  naviation: {
    label: "Navigation",
    items: NAV_ITEMS,
  },
  resources: {
    label: "Resources",
    items: [{ label: "Source Code", href: SOURCE_CODE }],
  },
  contact: {
    label: "Contact",
    items: SOCIALS,
  },
} as const;
