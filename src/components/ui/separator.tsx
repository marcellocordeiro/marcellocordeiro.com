import { cn } from "@/lib/utils";

export interface Props extends Omit<React.ComponentProps<"div">, "children"> {
  orientation?: "horizontal" | "vertical";
}

export function Separator({ className, orientation = "horizontal", ...props }: Props) {
  return (
    <div
      data-slot="separator"
      data-orientation={orientation}
      // role="separator"
      // aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className,
      )}
      {...props}
    />
  );
}
