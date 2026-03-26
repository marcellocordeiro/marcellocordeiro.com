import { Link } from "@/components/link";
import { ThemeToggle } from "@/components/themes/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { AUTHOR, COPYRIGHT, GITHUB_URL, LINKEDIN_URL, SOURCE_CODE } from "@/config/constants";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "@/config/icons";

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="mx-auto max-w-3xl px-10">
        {/* Top grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] justify-items-center gap-10">
          <FooterLinks />
        </div>

        {/* Bottom grid */}
        <div className="mt-10 flex flex-row items-center justify-between gap-4">
          <div className="">
            <Copyright />
            <Socials />
          </div>

          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}

function Copyright() {
  return <p className="text-sm text-muted-foreground">{COPYRIGHT}</p>;
}

function Socials() {
  const socials = [
    {
      label: "GitHub",
      href: GITHUB_URL,
      icon: GitHubIcon,
    },
    {
      label: "LinkedIn",
      href: LINKEDIN_URL,
      icon: LinkedInIcon,
    },
    {
      label: "Email",
      href: `mailto:${AUTHOR.email}`,
      icon: EmailIcon,
    },
  ] as const;

  return (
    <div className="flex items-center gap-1">
      {socials.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          aria-label={item.label}
          showExternalLinkIcon={false}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <item.icon />
        </Link>
      ))}
    </div>
  );
}

function FooterLinks() {
  return Object.entries(footerLinks).map(([group, links]) => (
    <div key={group}>
      <span className="text-sm font-medium">{group}</span>
      <nav>
        <ul className="mt-3.5 space-y-1.5">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  ));
}

const footerLinks = {
  Navigation: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "RSS", href: "/rss.xml" },
  ],
  Resources: [{ label: "Source code", href: SOURCE_CODE }],
  Contact: [
    { label: "GitHub", href: GITHUB_URL },
    { label: "LinkedIn", href: LINKEDIN_URL },
    { label: "Email", href: `mailto:${AUTHOR.email}` },
  ],
} as const;
