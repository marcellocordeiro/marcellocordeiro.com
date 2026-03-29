import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Layout } from "@/components/layout/next";
import { ThemeProvider } from "@/components/theme/theme-provider";
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
    <html
      lang="en"
      className={inter.variable}
      suppressHydrationWarning
      data-scroll-behavior="smooth" // https://nextjs.org/docs/messages/missing-data-scroll-behavior
    >
      <body>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
