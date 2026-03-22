"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

import { isTheme, type Theme } from "@/components/themes/themes";

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

  if (!isMounted || theme === undefined || !isTheme(theme)) {
    return {
      setTheme: setTheme,
    };
  }

  return {
    theme,
    setTheme,
  };
}
