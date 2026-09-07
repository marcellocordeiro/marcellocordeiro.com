import type { VariantProps } from "class-variance-authority";
import { cn } from "cn";

import { buttonGroupVariants } from "./variants";

type Props = React.FieldsetHTMLAttributes<HTMLFieldSetElement> &
  VariantProps<typeof buttonGroupVariants>;

export function ButtonGroup({ className, orientation, ...props }: Props) {
  return (
    <fieldset
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}
