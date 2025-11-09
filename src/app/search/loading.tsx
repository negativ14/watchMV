import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/Footer";
import HomeNav from "@/components/HomeNav";

export default function Loading() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 right-0 flex justify-center pointer-events-none">
        <div className="h-full w-full max-w-[1360px] mx-auto border-x border-dashed border-foreground/30" />
      </div>

      <HomeNav />

      <div className="border-y border-dashed border-foreground/30 relative overflow-hidden hidden md:block">
        <div className="max-w-7xl mx-auto border-x border-dashed bg-gradient-to-br from-sky-600 to-blue-600 flex items-center h-20 opacity-80">
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tighter px-4 text-sky-50 mx-auto">
            Search
          </h1>
        </div>
      </div>

      <div className="border-b border-dashed border-foreground/30">
        <div className="max-w-7xl mx-auto border-x p-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Skeleton className="h-10 w-full md:flex-1" />
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>

      <div className="border-b border-foreground/30 border-dashed">
        <div className="max-w-7xl mx-auto border-x">
          <div className="px-4 py-2 border-b border-dashed">
            <Skeleton className="h-7 w-40" />
          </div>

          <div className="flex gap-4 overflow-x-scroll scroll-hide p-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-shrink-0">
                <Skeleton className="h-[280px] w-[160px] rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-foreground/30 border-dashed">
        <div className="max-w-7xl mx-auto border-x">
          <div className="px-4 py-2 border-b border-dashed">
            <Skeleton className="h-7 w-32" />
          </div>

          <div className="flex gap-4 overflow-x-scroll scroll-hide p-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-shrink-0">
                <Skeleton className="h-[280px] w-[160px] rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-foreground/30 border-dashed mt-6">
        <div className="max-w-7xl mx-auto border-x">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
