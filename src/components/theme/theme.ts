import { DarkThemeIcon, LightThemeIcon, SystemThemeIcon } from "@/config/icons";

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
] as const;

export type Theme = "system" | "light" | "dark";
export type SystemTheme = Exclude<Theme, "system">;

export const DARK_MODE_MEDIA_QUERY = "(prefers-color-scheme: dark)";

export function isTheme(value: string): value is Theme {
  return value === "system" || value === "light" || value === "dark";
}

export function isSystemTheme(value: string): value is SystemTheme {
  return value === "light" || value === "dark";
}

export function getSystemTheme(): SystemTheme {
  return globalThis.matchMedia(DARK_MODE_MEDIA_QUERY).matches ? "dark" : "light";
}

export function updateTheme(theme: Theme) {
  if (theme === "system") {
    theme = getSystemTheme();
    localStorage.removeItem("theme");
  } else {
    localStorage.setItem("theme", theme);
  }

  updateDOMTheme(theme);
}

export function updateDOMTheme(systemTheme: SystemTheme) {
  document.documentElement.setAttribute("data-theme", systemTheme);
  document.documentElement.style.colorScheme = systemTheme;
}
