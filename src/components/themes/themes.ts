import { DarkThemeIcon, LightThemeIcon, SystemThemeIcon, type IconType } from "@/config/icons";

export type Theme = "system" | "light" | "dark";
export type SystemTheme = Exclude<Theme, "system">;

export function isTheme(value: string): value is Theme {
  return value === "system" || value === "light" || value === "dark";
}

export const themes = [
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
] as const satisfies {
  theme: Theme;
  label: string;
  icon: IconType;
}[];
