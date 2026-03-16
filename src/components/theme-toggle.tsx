"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DarkThemeIcon, LightThemeIcon, SystemThemeIcon } from "@/config/icons";
import { useTheme } from "@/hooks/use-theme";

interface Props {
  className?: string;
}

export function ThemeToggle({ className }: Props) {
  const { theme, systemTheme, setTheme } = useTheme();

  const items = [
    {
      theme: "light",
      label: "Light",
      icon: LightThemeIcon,
    },
    {
      theme: "system",
      label: ["System", systemTheme ? `(${systemTheme})` : null]
        .filter(Boolean)
        .join(" "),
      icon: SystemThemeIcon,
    },
    {
      theme: "dark",
      label: "Dark",
      icon: DarkThemeIcon,
    },
  ];

  return (
    <ButtonGroup className={className}>
      {items.map((item) => (
        <Tooltip key={item.theme}>
          <TooltipTrigger
            render={
              <Button
                variant={item.theme === theme ? "default" : "outline"}
                onClick={() => setTheme(item.theme)}
              >
                <item.icon />
              </Button>
            }
          />
          <TooltipContent>
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </ButtonGroup>
  );
}
