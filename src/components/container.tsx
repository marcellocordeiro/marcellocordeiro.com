export interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mx-auto min-h-dvh max-w-5xl bg-muted px-4 ring-1 ring-accent dark:bg-muted/30">
        {children}
      </div>
    </div>
  );
}
