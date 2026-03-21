export type Theme = "system" | "light" | "dark";
export type SystemTheme = Exclude<Theme, "system">;

export const THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)";

function isTheme(value: string): value is Theme {
  return value === "system" || value === "light" || value === "dark";
}

export function getUserThemePreference(): Theme {
  const value = localStorage.getItem("theme");

  if (value === null || !isTheme(value)) {
    return "system";
  }

  return value;
}

export function saveUserThemePreference(theme: Theme) {
  localStorage.setItem("theme", theme);
}

export function getSystemThemePreference(): SystemTheme {
  return window.matchMedia(THEME_MEDIA_QUERY).matches ? "dark" : "light";
}

export function registerTheme(theme: Theme) {
  saveUserThemePreference(theme);

  if (theme === "system") {
    theme = getSystemThemePreference();
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}
