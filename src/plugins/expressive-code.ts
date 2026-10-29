import type { AstroExpressiveCodeOptions } from "astro-expressive-code";

export const expressiveCodeConfig: AstroExpressiveCodeOptions = {
  themeCssSelector: (theme) => `[data-theme="${theme.type}"]`,
  themes: ["min-dark", "min-light"],
  useDarkModeMediaQuery: false,
  styleOverrides: {
    borderRadius: "var(--radius, 0.5em)",
    codeFontFamily: "var(--font-mono)",
    codeFontSize: "0.875rem",
    codeLineHeight: "1.7142857rem",
    codePaddingBlock: "0.75rem",
    codePaddingInline: "1rem",
    frames: {
      frameBoxShadowCssValue: "none",
    },

    uiFontFamily: "var(--font-sans)",
    uiLineHeight: "inherit",
  },
  useThemedScrollbars: false,
};
