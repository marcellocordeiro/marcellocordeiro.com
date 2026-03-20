"use client";

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

export type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export type Theme = "system" | "light" | "dark";

export interface UseThemeProps {
  theme?: Theme;
  setTheme: (theme: Theme) => void;
}

export function useTheme(): UseThemeProps {
  const { theme, setTheme } = useNextTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return {
      setTheme: setTheme,
    };
  }

  return {
    theme: theme as Theme | undefined,
    setTheme,
  };
}
