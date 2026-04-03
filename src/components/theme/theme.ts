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
  return globalThis.matchMedia(DARK_MODE_MEDIA_QUERY).matches ? "dark" : "light";
}

// Storage

const localStorageKey = "theme";

export function getSavedTheme(): Theme | null {
  const savedTheme = globalThis.localStorage.getItem(localStorageKey);

  if (isTheme(savedTheme)) {
    return savedTheme;
  }

  return null;
}

export function saveTheme(theme: Theme) {
  globalThis.localStorage.setItem(localStorageKey, theme);
}

export function clearSavedTheme() {
  globalThis.localStorage.removeItem(localStorageKey);
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
  const element = globalThis.document.documentElement;

  if (systemTheme === null) {
    delete element.dataset.theme;
  } else {
    element.dataset.theme = systemTheme;
  }
}
