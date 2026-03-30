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

export function isTheme(value: string | null): value is Theme {
  return value === "system" || value === "light" || value === "dark";
}

export function isSystemTheme(value: string | null): value is SystemTheme {
  return value === "light" || value === "dark";
}

export function getSystemTheme(): SystemTheme {
  return globalThis.matchMedia(DARK_MODE_MEDIA_QUERY).matches ? "dark" : "light";
}

export function updateTheme(theme: Theme) {
  if (theme === "system") {
    theme = getSystemTheme();
    globalThis.localStorage.removeItem("theme");
  } else {
    globalThis.localStorage.setItem("theme", theme);
  }

  updateDOMTheme(theme);
}

export function updateDOMTheme(systemTheme: SystemTheme) {
  const element = globalThis.document.documentElement;

  element.dataset.theme = systemTheme;
  element.style.colorScheme = systemTheme;
}
