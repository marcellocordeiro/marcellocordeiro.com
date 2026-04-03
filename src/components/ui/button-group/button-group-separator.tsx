import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof Separator>;

export function ButtonGroupSeparator({ className, orientation = "vertical", ...props }: Props) {
  return (
    <Separator
      data-slot="button-group-separator"
      data-orientation={orientation}
      // orientation={orientation}
      className={cn(
        "relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className,
      )}
      {...props}
    />
  );
}
