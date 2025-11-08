import { Skeleton } from "@/components/ui/skeleton";

export default function CardsSkeleton() {
  return (
    <div className="relative w-full flex gap-4 overflow-x-auto px-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 flex flex-col justify-between h-[280px] w-[160px]"
        >
          <Skeleton className="h-[220px] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </div>
      ))}
    </div>
  );
}
