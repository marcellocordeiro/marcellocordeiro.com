import { cn } from "@/lib/utils";

type LinkProps = React.ComponentProps<"a">;

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <a className={cn(className)} {...props}>
      {children}
    </a>
  );
}

type ExternalLinkProps = React.ComponentProps<"a">;

export function ExternalLink({ className, children, ...props }: ExternalLinkProps) {
  return (
    <a className={cn(className)} rel="noopener noreferrer" target="_blank" {...props}>
      {children}
    </a>
  );
}
