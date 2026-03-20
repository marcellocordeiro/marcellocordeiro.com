import { cn } from "@/lib/utils";

export interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className={cn("mx-auto max-w-5xl px-4", className)}>{children}</div>
    </div>
  );
}
