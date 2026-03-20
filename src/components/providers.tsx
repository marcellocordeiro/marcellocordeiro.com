import { ThemeProvider } from "@/components/theme-provider";

export interface ProviderProps {
  children: React.ReactNode;
}
export function Providers({ children }: ProviderProps) {
  return <ThemeProvider disableTransitionOnChange>{children}</ThemeProvider>;
}
