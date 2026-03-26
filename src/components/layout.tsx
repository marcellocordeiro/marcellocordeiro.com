import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="wrapper py-4">{children}</main>
      <Footer />
    </>
  );
}
