import { Skeleton } from "@/components/ui/skeleton";

export default function VideoContainerSkeleton() {
  return (
    <div className="relative w-full aspect-video overflow-hidden bg-black">
      <Skeleton className="absolute inset-0 w-full h-full rounded-none" />

      <div className="absolute inset-0 flex flex-col justify-end gap-4 p-6 bg-gradient-to-b from-transparent to-black/60">
        <div className="space-y-2">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>

        <div className="flex gap-4 pt-4">
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-36 rounded-md" />
        </div>
      </div>
    </div>
  );
}
