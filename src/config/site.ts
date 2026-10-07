export const SITE_URL = "https://marcellocordeiro.com";

export const BLOG_PATH = "/blog";
export const BLOG_URL = `${SITE_URL}${BLOG_PATH}}`;

export const FAVICON_ICO_PATH = "/favicon.ico";
export const FAVICON_ICO_URL = `${SITE_URL}${FAVICON_ICO_PATH}`;

export const RSS_PATH = "/rss.xml";
export const RSS_URL = `${SITE_URL}${RSS_PATH}`;

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
