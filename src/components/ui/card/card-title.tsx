import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"div">;

export function CardTitle({ className, children, ...props }: Props) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading text-base font-medium", className)}
      {...props}
    >
      {children}
    </div>
  );
}
