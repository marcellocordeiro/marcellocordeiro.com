import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function Typography({ className, children }: Props) {
  return <article className={cn("prose dark:prose-invert", className)}>{children}</article>;
}
