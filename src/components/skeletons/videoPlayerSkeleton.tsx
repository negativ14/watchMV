import { Skeleton } from "@/components/ui/skeleton";

export default function VideoPlayerSkeleton() {
  return (
    <div className="w-full aspect-video relative overflow-hidden select-none bg-black">
      <Skeleton className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
    </div>
  );
}
