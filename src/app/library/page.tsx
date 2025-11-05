import Footer from "@/components/Footer";
import HomeNav from "@/components/HomeNav";
import LibraryList from "@/components/LibraryList";
import { LibraryBig } from "lucide-react";

export default function Page() {
  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex justify-center z-50">
        <div className="max-w-[1360px] w-full h-full border-x border-dashed border-foreground/30"></div>
      </div>
      <HomeNav />

      <div className="border-b border-foreground/30 border-dashed relative overflow-hidden">
        <div className="h-20 border-x border-dashed max-w-7xl mx-auto bg-gradient-to-br from-sky-600 to-blue-600 opacity-80 flex items-center">
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tighter px-4 text-sky-100 mx-auto">
            Your Library
          </h1>

          <LibraryBig className="absolute size-32 text-white opacity-20 left-96 bottom-0 -rotate-45" />
          <LibraryBig className="absolute size-32 text-white opacity-20 right-96 -top-2 -rotate-45" />
        </div>
      </div>

      <div className="border-b">
        <div className="h-15 max-w-7xl mx-auto border-x"></div>
      </div>

      <LibraryList title="Favroites" cardCategory="favorite" />
      <LibraryList title="WatchLater" cardCategory="watchLater" />
      <LibraryList title="WatchHistory" cardCategory="watchHistory" />
      <Footer />
    </main>
  );
}
