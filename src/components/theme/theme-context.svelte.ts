import { untrack } from "svelte";
import { MediaQuery } from "svelte/reactivity";

import {
  DARK_MODE_MEDIA_QUERY,
  getSavedTheme,
  type Theme,
  updateDOMTheme,
  updateTheme,
} from "./theme";

export function createThemeContext() {
  let currentTheme: Theme | null = $state(null);
  const prefersDarkMode = new MediaQuery(DARK_MODE_MEDIA_QUERY);

  // Initial state, only run once
  $effect(() => {
    untrack(() => {
      currentTheme = getSavedTheme() ?? "system";
    });
  });

  // Media query listener
  $effect(() => {
    // Only update the DOM if the user did not set any preference
    if (untrack(() => currentTheme) !== "system") {
      return;
    }

    // Does not update the local storage
    const theme = prefersDarkMode.current ? "dark" : "light";

    document.startViewTransition(() => {
      updateDOMTheme(theme);
    });
  });

  function handleUserSelection(value: Theme) {
    currentTheme = value;

    document.startViewTransition(() => {
      updateTheme(value);
    });
  }

  return {
    get value() {
      return currentTheme;
    },
    set value(value: Theme | null) {
      if (value === null) {
        return;
      }

      handleUserSelection(value);
    },
  };
}
