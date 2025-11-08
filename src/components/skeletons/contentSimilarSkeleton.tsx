import { Skeleton } from "@/components/ui/skeleton";

export default function ContentSimilarSkeleton() {
  return (
    <div className="border-b border-foreground/30 border-dashed">
      <div className="max-w-7xl mx-auto border-x">
        <div className="px-4 py-1 border-b">
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="flex overflow-x-auto gap-4 px-4 py-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[160px]">
              <Skeleton className="h-[220px] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </div>
          ))}
        </div>

        <div className="h-10 border-t" />
      </div>
    </div>
  );
}
