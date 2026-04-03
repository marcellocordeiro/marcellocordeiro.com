import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"div">;

export function CardAction({ className, children, ...props }: Props) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    >
      {children}
    </div>
  );
}
