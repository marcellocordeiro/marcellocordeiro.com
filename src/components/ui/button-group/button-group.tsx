import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { buttonGroupVariants } from "./variants";

type Props = React.ComponentProps<"fieldset"> & VariantProps<typeof buttonGroupVariants>;

export function ButtonGroup({ className, orientation, children, ...props }: Props) {
  return (
    <fieldset
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    >
      {children}
    </fieldset>
  );
}
