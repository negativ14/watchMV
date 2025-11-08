import { Skeleton } from "@/components/ui/skeleton";

export default function ContentDetailsSkeleton() {
  return (
    <div className="border-b border-dashed border-foreground/30">
      <div className="max-w-7xl mx-auto border-x flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between border-b pb-2">
          <Skeleton className="h-7 w-2/3" />
          <div className="flex gap-3">
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        </div>

        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-56" />

        <div className="flex flex-wrap gap-2 border-y py-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-md" />
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="overflow-x-auto flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-[100px] h-[140px] rounded-md flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
