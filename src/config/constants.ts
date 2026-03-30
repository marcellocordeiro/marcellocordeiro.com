import { EmailIcon, GitHubIcon, HouseIcon, LinkedInIcon, NewspaperIcon, RssIcon } from "./icons";

export const SITE_URL = "https://marcellocordeiro.com";
export const BLOG_URL = `${SITE_URL}/blog`;
export const FAVICON_ICO_URL = `${SITE_URL}/favicon.ico`;
export const RSS_URL = `${SITE_URL}/rss.xml`;

export const AUTHOR = {
  name: "Marcello Cordeiro",
  email: `${atob("aGVsbG8=")}\u0040${SITE_URL.replace("https://", "")}`,
} as const;

export const COPYRIGHT = `© ${new Date().getFullYear()} ${AUTHOR.name}`;

export const SITE_TITLE = AUTHOR.name;
export const SITE_DESCRIPTION =
  "This is my personal website where I try to post cool things about me, my work and my hobbies.";

export const GITHUB_URL = "https://github.com/marcellocordeiro";
export const LINKEDIN_URL = "https://www.linkedin.com/in/marcello-cordeiro";

export const SOURCE_CODE = `${GITHUB_URL}/marcellocordeiro.com`;

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
  Navigation: NAV_ITEMS,
  Resources: [{ label: "Source Code", href: SOURCE_CODE }],
  Contact: SOCIALS,
} as const;
