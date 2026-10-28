import { type ShikiConfig } from "astro";

export const shikiConfig: ShikiConfig = {
  themes: {
    light: "catppuccin-latte",
    dark: "catppuccin-mocha",
  },
  defaultColor: "light-dark()",
};
