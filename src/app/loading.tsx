import VideoContainerSkeleton from "@/components/skeletons/videoContainerSkeleton";
import ListSkeleton from "@/components/skeletons/listSkeleton";

export default function Loading() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex justify-center z-50">
        <div className="max-w-[1360px] w-full h-full border-x border-dashed border-foreground/30"></div>
      </div>

      <div className="border-px border-b border-foreground/30 relative">
        <div className="relative h-10 border-y border-foreground/30 ">
          <div className="max-w-[1360px] mx-auto border-x border-foreground/30 h-full bg-background relative z-10">
            <div className="max-w-7xl mx-auto border-x h-full"></div>
          </div>
          <div className="absolute inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
        </div>

        <div className="max-w-7xl h-full border-x-px mx-auto relative">
          <div className="h-full w-full overflow-hidden">
            <VideoContainerSkeleton />
          </div>

          <div className="absolute h-full w-10 -left-10 top-0 border bg-background hidden xl:block">
            <div className="absolute inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
          </div>
          <div className="absolute h-full w-10 -right-10 top-0 border bg-background hidden xl:block">
            <div className="absolute inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
          </div>
        </div>
      </div>

      <div className="relative h-10 border-b border-foreground/30">
        <div className="max-w-[1360px] mx-auto border-x border-foreground/30 h-full bg-background relative z-10">
          <div className="max-w-7xl mx-auto border-x h-full"></div>
        </div>
        <div className="absolute inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
      </div>

      <div className="space-y-8 mt-8">
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
      </div>
    </div>
  );
}
