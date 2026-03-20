import { cn } from "@/lib/utils";

export interface TypographyProps {
  className?: string;
  children: React.ReactNode;
}

export function Typography({ className, children }: TypographyProps) {
  return <article className={cn("prose dark:prose-invert", className)}>{children}</article>;
}
