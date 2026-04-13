import { onMount, untrack } from "svelte";
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
  onMount(() => {
    currentTheme = getSavedTheme() ?? "system";
  });

  // Media query listener
  // Should not update the local storage
  $effect(() => {
    // Make sure this dependency is registered
    // Moving this after the conditional will stop this effect from running
    const theme = prefersDarkMode.current ? "dark" : "light";

    // Only update the DOM if the user did not set any preference
    if (untrack(() => currentTheme) !== "system") {
      return;
    }

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
    apply(value: Theme) {
      if (value === currentTheme) {
        return;
      }

      handleUserSelection(value);
    },
  };
}
