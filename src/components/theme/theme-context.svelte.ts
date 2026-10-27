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
  $effect(() => {
    // Make sure we register the media query dependency first thing,
    // so we only run this effect when the media query changes
    // instead of when the currentTheme changes
    const theme = prefersDarkMode.current ? "dark" : "light";

    // Only update the DOM if the user did not set any preference,
    // and do not register the currentTheme as a dependency
    if (untrack(() => currentTheme !== "system")) {
      console.log("should not update the dom");
      return;
    }

    // Does not update the local storage
    updateDOMTheme(theme);
  });

  function handleUserSelection(value: Theme) {
    currentTheme = value;

    updateTheme(value);
  }

  return {
    get value(): Theme | null {
      return currentTheme;
    },
    set value(value: Theme) {
      handleUserSelection(value);
    },
  };
}
