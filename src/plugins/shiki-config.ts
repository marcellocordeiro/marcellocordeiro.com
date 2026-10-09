import { type ShikiConfig } from "astro";

export const shikiConfig: ShikiConfig = {
  themes: {
    light: "github-light",
    dark: "github-dark",
  },
  defaultColor: "light-dark()",
};
