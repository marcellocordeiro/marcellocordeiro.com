export const variants = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "link",
] as const;

export const sizes = [
  "default",
  "sm",
  "xs",
  "lg",
  "icon",
  "icon-xs",
  "icon-sm",
  "icon-lg",
] as const;

export type ButtonVariant = (typeof variants)[number];
export type ButtonSize = (typeof sizes)[number];
