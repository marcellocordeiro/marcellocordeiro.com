import { AUTHOR, GITHUB_URL, LINKEDIN_URL, SOURCE_CODE } from "./constants";
import { EmailIcon, GitHubIcon, HouseIcon, LinkedInIcon, NewspaperIcon, RssIcon } from "./icons";

export const SOCIALS = [
  {
    href: GITHUB_URL,
    label: "GitHub",
    Icon: GitHubIcon,
  },
  {
    href: LINKEDIN_URL,
    label: "LinkedIn",
    Icon: LinkedInIcon,
  },
  {
    href: `mailto:${AUTHOR.email}`,
    label: "Email",
    Icon: EmailIcon,
  },
] as const;

export const NAV_ITEMS = [
  {
    href: "/",
    label: "Home",
    Icon: HouseIcon,
  },
  {
    href: "/blog",
    label: "Blog",
    Icon: NewspaperIcon,
  },
  {
    href: "/rss.xml",
    label: "RSS",
    Icon: RssIcon,
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
