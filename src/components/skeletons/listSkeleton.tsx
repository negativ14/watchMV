import { Skeleton } from "@/components/ui/skeleton";
import CardsSkeleton from "./cardsSkeleton";

export default function ListSkeleton() {
  return (
    <div className="w-full">
      <div className="w-full border-b">
        <div className="max-w-7xl mx-auto border-x overflow-hidden py-1">
          <div className="border-b border-dashed px-4 py-2 flex items-center gap-3">
            <Skeleton className="h-6 w-40" />
          </div>

          <CardsSkeleton />
        </div>
      </div>

      <div className="border-b border-foreground/30">
        <div className="relative max-w-7xl mx-auto h-10">
          <div className="absolute opacity-80 inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
        </div>
      </div>
    </div>
  );
}
