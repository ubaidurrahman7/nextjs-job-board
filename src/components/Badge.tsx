interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="rounded border bg-muted-foreground px-2 py-0.5 text-sm font-medium">
      {children}
    </span>
  );
}
