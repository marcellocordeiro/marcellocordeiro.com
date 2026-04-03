import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"div">;

export function CardFooter({ className, children, ...props }: Props) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-4xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
