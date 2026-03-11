import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Marcello's blog",
    default: "Marcello's blog",
  },
};

export default function Layout({ children }: LayoutProps<"/blog">) {
  return children
}
