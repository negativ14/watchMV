import { Skeleton } from "@/components/ui/skeleton";

export default function ContentReviewsSkeleton() {
  return (
    <div className="border-b border-dashed border-foreground/30">
      <div className="max-w-7xl mx-auto border-x">
        <h1 className="text-2xl font-semibold tracking-tight px-4 py-1 border-b">
          <Skeleton className="h-6 w-32" />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-secondary rounded-xl p-4 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>

        <div className="h-10 border-t" />
      </div>
    </div>
  );
}
