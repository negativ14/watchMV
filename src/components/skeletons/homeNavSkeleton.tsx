export default function HomeNavSkeleton() {
  return (
    <div className="border-b border-dashed border-foreground/30">
      <div className="h-20 border-x max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-1">
          <div className="w-28 h-8 bg-muted animate-pulse rounded-md" />
        </div>

        <div className="w-16 h-5 bg-muted animate-pulse rounded-md" />
      </div>
    </div>
  );
}
