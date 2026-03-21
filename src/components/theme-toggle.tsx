import { useCallback, useEffect, useState } from "react";

import {
  registerTheme,
  getUserThemePreference,
  type Theme,
  THEME_MEDIA_QUERY,
} from "@/components/theme";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DarkThemeIcon, LightThemeIcon, SystemThemeIcon, type IconType } from "@/config/icons";

export interface ThemeToggleProps {
  className?: string;
}

const items = [
  {
    theme: "light",
    label: "Light",
    icon: LightThemeIcon,
  },
  {
    theme: "system",
    label: "System",
    icon: SystemThemeIcon,
  },
  {
    theme: "dark",
    label: "Dark",
    icon: DarkThemeIcon,
  },
] satisfies {
  theme: Theme;
  label: string;
  icon: IconType;
}[];

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme | null>();

  const handleNewTheme = useCallback((newTheme: Theme) => {
    registerTheme(newTheme);
    setTheme(newTheme);
  }, []);

  useEffect(() => {
    setTheme(getUserThemePreference());
  }, []);

  useEffect(() => {
    const handleMediaQuery = () => {
      if (theme === "system") {
        handleNewTheme("system");
      }
    };
    const media = window.matchMedia(THEME_MEDIA_QUERY);

    media.addEventListener("change", handleMediaQuery);

    return () => media.removeEventListener("change", handleMediaQuery);
  }, [theme, handleNewTheme]);

  return (
    <ButtonGroup className={className}>
      {items.map((item) => (
        <Button
          key={item.theme}
          variant={item.theme === theme ? "default" : "outline"}
          onClick={() => handleNewTheme(item.theme)}
        >
          <item.icon />
        </Button>
      ))}
    </ButtonGroup>
  );
}
