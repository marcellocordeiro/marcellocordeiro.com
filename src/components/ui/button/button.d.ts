type ButtonVariant = "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
type ButtonSize = "default" | "sm" | "xs" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";

declare namespace astroHTML.JSX {
  interface ButtonHTMLAttributes {
    "data-variant"?: ButtonVariant;
    "data-size"?: ButtonSize;
  }
}
