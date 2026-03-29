import { Link } from "@/components/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { COPYRIGHT, FOOTER_ITEMS, SOCIALS } from "@/config/constants";

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
            <p className="text-sm text-muted-foreground">{COPYRIGHT}</p>
            <Socials />
          </div>

          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}

function Socials() {
  return (
    <div className="flex items-center gap-1">
      {SOCIALS.map((item) => (
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
  return Object.entries(FOOTER_ITEMS).map(([group, links]) => (
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
