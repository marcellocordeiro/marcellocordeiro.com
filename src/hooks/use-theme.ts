import { type UseThemeProps, useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = Pick<UseThemeProps, "theme" | "systemTheme" | "setTheme">;

export function useTheme(): Props {
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
