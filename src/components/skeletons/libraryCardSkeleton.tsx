import { Skeleton } from "@/components/ui/skeleton";

export default function LibraryCardSkeleton() {
  return (
    <div className="relative flex-shrink-0 group max-w-fit w-[160px] cursor-pointer">
      <div className="flex flex-col h-[280px] w-full justify-between">
        <div className="relative flex items-center justify-center px-4 py-6 flex-1">
          <Skeleton className="w-[128px] h-[192px] rounded-lg" />
        </div>
        <Skeleton className="h-6 w-[120px] mx-4 mb-2 rounded" />
      </div>
    </div>
  );
}
