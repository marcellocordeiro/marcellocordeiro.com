import type { Metadata } from "next";

import { Typography } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: {
    template: "%s | Marcello's blog",
    default: "Marcello's blog",
  },
};

export default function Layout({ children }: LayoutProps<"/blog/[slug]">) {
  return (
    <Typography>
      {children}
    </Typography>
  );
}
