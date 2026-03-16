"use client";

import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
  type UseThemeProps as NextUseThemeProps,
} from "next-themes";
import { useEffect, useState } from "react";

export type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

type UseThemeProps = Pick<NextUseThemeProps, "theme" | "systemTheme" | "setTheme">;

export function useTheme(): UseThemeProps {
  const { theme, systemTheme, setTheme } = useNextTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return {
      theme: undefined,
      systemTheme: undefined,
      setTheme: setTheme,
    };
  }

  return {
    theme,
    systemTheme,
    setTheme,
  };
}
