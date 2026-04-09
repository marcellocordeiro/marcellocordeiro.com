// Types

export type Theme = "system" | "light" | "dark";
export type SystemTheme = Exclude<Theme, "system">;

// Assertions

export function isTheme(value: string | null): value is Theme {
  return value === "system" || value === "light" || value === "dark";
}

export function isSystemTheme(value: string | null): value is SystemTheme {
  return value === "light" || value === "dark";
}

// Media queries

export const DARK_MODE_MEDIA_QUERY = "(prefers-color-scheme: dark)";

export function getSystemTheme(): SystemTheme {
  return matchMedia(DARK_MODE_MEDIA_QUERY).matches ? "dark" : "light";
}

// Storage

const localStorageKey = "theme";

export function getSavedTheme(): Theme | null {
  const savedTheme = localStorage.getItem(localStorageKey);

  if (isTheme(savedTheme)) {
    return savedTheme;
  }

  return null;
}

export function saveTheme(theme: Theme) {
  localStorage.setItem(localStorageKey, theme);
}

export function clearSavedTheme() {
  localStorage.removeItem(localStorageKey);
}

// Updates

export function updateTheme(theme: Theme) {
  if (theme === "system") {
    theme = getSystemTheme();
    clearSavedTheme();
  } else {
    saveTheme(theme);
  }

  updateDOMTheme(theme);
}

export function updateDOMTheme(systemTheme: SystemTheme | null) {
  if (systemTheme === null) {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = systemTheme;
  }
}
