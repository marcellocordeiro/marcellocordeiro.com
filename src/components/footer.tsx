import { ExternalLink } from "@/components/link";
import { ThemeToggle } from "@/components/themes/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { info } from "@/config/constants";

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="mx-auto max-w-3xl px-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
  const year = new Date().getFullYear();

  return (
    <p className="text-sm text-muted-foreground">{`© ${year} ${info.firstName} ${info.lastName}`}</p>
  );
}

function Socials() {
  return (
    <div className="flex items-center gap-1">
      {info.socials.map((item) => (
        <ExternalLink
          key={item.label}
          href={item.href}
          aria-label={item.label}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <item.icon />
        </ExternalLink>
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
              <ExternalLink
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  ));
}

const footerLinks = {
  Product: [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Changelog", href: "#", badge: "New" },
    { label: "Roadmap", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Status", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};
