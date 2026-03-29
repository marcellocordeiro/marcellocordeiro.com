import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <NextThemesProvider disableTransitionOnChange>{children}</NextThemesProvider>;
}
