import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <div className="flex w-full flex-col gap-8 px-4">
        <Header />

        <main className="flex-auto">{children}</main>

        <Separator />

        <Footer className="mb-8" />
      </div>
    </Container>
  );
}
