import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"div">;

export function CardDescription({ className, children, ...props }: Props) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </div>
  );
}
