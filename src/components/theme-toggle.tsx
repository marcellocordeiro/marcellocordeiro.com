"use client";

import type { IconType } from "react-icons";

import { useTheme, type Theme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DarkThemeIcon, LightThemeIcon, SystemThemeIcon } from "@/config/icons";

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

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

  return (
    <ButtonGroup className={className}>
      {items.map((item) => (
        <Button
          key={item.theme}
          variant={item.theme === theme ? "default" : "outline"}
          onClick={() => setTheme(item.theme)}
        >
          <item.icon />
        </Button>
      ))}
    </ButtonGroup>
  );
}
