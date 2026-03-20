import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />

      <Container>
        <main className="mx-auto w-full flex-auto py-4">{children}</main>
      </Container>

      <Footer />
    </>
  );
}
