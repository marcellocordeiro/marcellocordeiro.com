import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"div">;

export function ButtonGroupText({ className, children, ...props }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-4xl border bg-muted px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-slot="button-group-text"
      {...props}
    >
      {children}
    </div>
  );
}
