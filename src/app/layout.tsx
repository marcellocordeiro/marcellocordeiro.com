import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { RSS_URL, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/config/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_TITLE}`,
    default: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": RSS_URL,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      {/* TODO: doesn't work well with this. Figure out why.
       grid grid-rows-[auto_1fr_auto] min-block-svh place-items-center */}
      <body>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
