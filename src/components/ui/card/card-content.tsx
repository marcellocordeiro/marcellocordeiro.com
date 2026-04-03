import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"div">;

export function CardContent({ className, children, ...props }: Props) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 group-data-[size=sm]/card:px-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
