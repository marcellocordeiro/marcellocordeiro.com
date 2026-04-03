import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { buttonVariants } from "./variants";

type Props = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: Props) {
  return (
    <button
      type="button"
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
}
