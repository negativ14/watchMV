import Footer from "@/components/Footer";
import LibraryListSkeleton from "@/components/skeletons/libraryListSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import HomeNavSkeleton from "@/components/skeletons/homeNavSkeleton";

export default function Loading() {
  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex justify-center z-50">
        <div className="max-w-[1360px] w-full h-full border-x border-dashed border-foreground/30"></div>
      </div>

      <HomeNavSkeleton />

      <div className="border-b border-foreground/30 border-dashed relative overflow-hidden">
        <div className="h-20 border-x border-dashed max-w-7xl mx-auto bg-gradient-to-br from-sky-600 to-blue-600 opacity-80 flex items-center justify-center">
          <Skeleton className="h-8 w-64 rounded-md" />
        </div>
      </div>

      <div className="border-b">
        <div className="h-15 max-w-7xl mx-auto border-x"></div>
      </div>

      <LibraryListSkeleton />
      <LibraryListSkeleton />
      <LibraryListSkeleton />
    </main>
  );
}
