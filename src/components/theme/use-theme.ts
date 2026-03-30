"use client";

import { useEffect, useState } from "react";

import {
  DARK_MODE_MEDIA_QUERY,
  isTheme,
  updateDOMTheme,
  updateTheme,
  type Theme,
} from "@/components/theme/theme";

export interface UseTheme {
  theme?: Theme;
  setTheme: (theme: Theme) => void;
}

export function useTheme(): UseTheme {
  const [theme, setTheme] = useState<Theme>("system");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") ?? "system";

    if (savedTheme === "system" || savedTheme === "light" || savedTheme === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(savedTheme);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleMediaChange = (ev: MediaQueryListEvent) => {
      if (theme !== "system") {
        return;
      }

      const resolvedTheme = ev.matches ? "dark" : "light";

      updateDOMTheme(resolvedTheme);
    };

    const mql = globalThis.matchMedia(DARK_MODE_MEDIA_QUERY);

    mql.addEventListener("change", handleMediaChange);

    return () => mql.removeEventListener("change", handleMediaChange);
  }, [theme]);

  if (!isMounted || theme === undefined || !isTheme(theme)) {
    return {
      setTheme: (_) => {},
    };
  }

  const handleSetTheme = (newTheme: Theme) => {
    updateTheme(newTheme);
    setTheme(newTheme);
  };

  return {
    theme,
    setTheme: handleSetTheme,
  };
}
