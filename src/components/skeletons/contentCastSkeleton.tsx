import { Skeleton } from "@/components/ui/skeleton";

export default function ContentCastSkeleton() {
  return (
    <div className="border-b border-dashed border-foreground/30">
      <div className="max-w-7xl mx-auto border-x flex flex-col">
        <h2 className="text-2xl font-semibold tracking-tight px-4 py-1">
          <Skeleton className="h-6 w-28" />
        </h2>

        <div className="overflow-x-auto px-4 py-3 flex gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center w-[100px] flex-shrink-0"
            >
              <Skeleton className="w-[80px] h-[100px] rounded-lg" />
              <Skeleton className="h-4 w-20 mt-2" />
            </div>
          ))}
        </div>

        <div className="h-10 border-t" />
      </div>
    </div>
  );
}
