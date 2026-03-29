import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export interface LayoutProps {
  pathname: string;
  children: React.ReactNode;
}

export function Layout({ pathname, children }: LayoutProps) {
  return (
    <>
      <Header pathname={pathname} />
      <main className="wrapper py-4">{children}</main>
      <Footer />
    </>
  );
}
