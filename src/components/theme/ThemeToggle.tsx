import { useEffect, useState } from "react";

import { MonitorIcon, MoonIcon, SunIcon } from "@/config/icons";

import { ButtonGroup } from "../ui/button-group/ButtonGroup";
import { Button } from "../ui/button/Button";
import {
  DARK_MODE_MEDIA_QUERY,
  getSavedTheme,
  updateDOMTheme,
  updateTheme,
  type Theme,
} from "./theme";

const themes = [
  {
    theme: "light",
    label: "Light",
    Icon: SunIcon,
  },
  {
    theme: "system",
    label: "System",
    Icon: MonitorIcon,
  },
  {
    theme: "dark",
    label: "Dark",
    Icon: MoonIcon,
  },
] as const;

export function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setCurrentTheme(getSavedTheme() ?? "system");
  }, []);

  useEffect(() => {
    let mounted = true;
    const mql = globalThis.matchMedia(DARK_MODE_MEDIA_QUERY);
    const onChange = () => {
      if (!mounted) {
        return;
      }

      // Only update the DOM if the user did not set any preference
      if (currentTheme !== "system") {
        return;
      }

      const theme = mql.matches ? "dark" : "light";

      updateDOMTheme(theme);
    };

    mql.addEventListener("change", onChange);

    return () => {
      mounted = false;
      mql.removeEventListener("change", onChange);
    };
  }, [currentTheme]);

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    updateTheme(theme);
  };

  return (
    <ButtonGroup role="radiogroup">
      {themes.map((item) => (
        <Button
          key={item.theme}
          role="radio"
          variant={item.theme === currentTheme ? "default" : "outline"}
          aria-label={`Switch theme to ${item.label}`}
          onClick={() => handleThemeChange(item.theme)}
        >
          <item.Icon />
        </Button>
      ))}
    </ButtonGroup>
  );
}
