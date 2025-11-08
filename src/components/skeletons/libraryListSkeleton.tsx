import { Skeleton } from "@/components/ui/skeleton";
import LibraryCardSkeleton from "./libraryCardSkeleton";

export default function LibraryListSkeleton() {
  return (
    <div className="w-full">
      <div className="w-full border-b border-foreground/30">
        <div className="max-w-7xl mx-auto border-x overflow-hidden">
          <div className="border-b border-dashed border-foreground/30 px-4 py-2 flex items-center gap-3">
            <Skeleton className="h-6 w-40" />
          </div>

          <div className="overflow-x-scroll scroll-hide flex gap-2 px-2 border-b py-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <LibraryCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="border-b">
        <div className="relative max-w-7xl mx-auto h-10">
          <div className="absolute opacity-80 inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
        </div>
      </div>
    </div>
  );
}
