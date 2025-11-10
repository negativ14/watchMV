import HomeNavSkeleton from "@/components/skeletons/homeNavSkeleton";

export default function Loading() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 right-0 flex justify-center pointer-events-none">
        <div className="h-full w-full max-w-[1360px] mx-auto border-x border-dashed border-foreground/30" />
      </div>

      <HomeNavSkeleton />

      <div className="border-y border-dashed border-foreground/30 relative overflow-hidden hidden md:block">
        <div className="max-w-7xl mx-auto border-x border-dashed bg-gradient-to-br from-sky-600 to-blue-600 flex items-center h-20 opacity-80">
          <div className="w-32 h-6 bg-white/30 animate-pulse rounded-md mx-auto" />
        </div>
      </div>

      <div className="border-b border-dashed border-foreground/30">
        <div className="max-w-7xl mx-auto border-x p-4 flex items-center gap-4">
          <div className="flex-1 h-10 rounded-md bg-muted animate-pulse" />
          <div className="h-10 w-20 rounded-md bg-muted animate-pulse" />
          <div className="h-10 w-28 rounded-md bg-muted animate-pulse" />
        </div>
      </div>

      <div className="border-b border-dashed border-foreground/30 mt-6 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto border-x text-center px-4 flex flex-col items-center gap-6 w-full">
          <div className="w-2/3 h-6 bg-muted animate-pulse rounded-md" />
          <div className="w-1/2 h-5 bg-muted/70 animate-pulse rounded-md" />
          <div className="flex gap-4 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-[200px] w-[140px] bg-muted animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
