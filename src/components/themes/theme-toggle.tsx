"use client";

import { themes } from "@/components/themes/themes";
import { useTheme } from "@/components/themes/use-theme";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <ButtonGroup className={className}>
      {themes.map((item) => (
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
