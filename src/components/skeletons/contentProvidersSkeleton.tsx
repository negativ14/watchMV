import { Skeleton } from "@/components/ui/skeleton";

export default function ContentProviderSkeleton() {
  return (
    <div className="border-b border-dashed border-foreground/30">
      <h2 className="max-w-7xl mx-auto px-4 py-1 border-x text-2xl font-semibold tracking-tight border-b">
        <Skeleton className="h-6 w-52" />
      </h2>

      <div className="max-w-7xl mx-auto border-x flex flex-col gap-4 py-5">
        <div className="px-4 flex items-center flex-wrap gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 w-[100px]">
              <Skeleton className="h-[80px] w-[80px] rounded-2xl" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>

        <div className="h-5 border-t" />
      </div>
    </div>
  );
}
