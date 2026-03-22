import { ThemeProvider } from "@/components/themes/theme-provider";

export interface ProviderProps {
  children: React.ReactNode;
}
export function Providers({ children }: ProviderProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
