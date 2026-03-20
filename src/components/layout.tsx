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
        <main className="flex-auto py-4 mx-auto w-full">{children}</main>
      </Container>

      <Footer />
    </>
  );
}
