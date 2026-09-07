import { cn } from "cn";

import { HeaderNavigationItems } from "@/components/header/HeaderNavigationItems";
import { Link } from "@/components/Link";
import { AUTHOR } from "@/config/constants";

interface Props {
  className: string;
  pathname: string;
}

export function DesktopHeader({ className, pathname }: Props) {
  return (
    <header className={cn("border-b bg-background/80 backdrop-blur", className)}>
      <div className="min-h-header mx-auto flex max-w-3xl items-center justify-between px-4">
        <Link className="text-xl font-semibold" href="/">
          {AUTHOR.name}
        </Link>

        <nav>
          <ul className="flex gap-4 rounded font-medium">
            <HeaderNavigationItems pathname={pathname} />
          </ul>
        </nav>
      </div>
    </header>
  );
}
