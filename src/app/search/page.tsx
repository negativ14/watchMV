import HomeNav from "@/components/HomeNav";
import SearchBar from "@/components/SearchBar";

export default async function Page({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const query = searchParams?.query?.trim() || "";

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 right-0 flex justify-center pointer-events-none">
        <div className="h-full w-full max-w-[1360px] mx-auto border-x border-dashed border-foreground/30" />
      </div>
      <HomeNav />

      <div className="border-y border-dashed border-foreground/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto border-x border-dashed bg-gradient-to-br from-sky-600 to-blue-600 flex items-center h-20 opacity-80">
          <h1 className="text-text-2xl md:text-4xl font-semibold tracking-tighter px-4 text-sky-50 mx-auto">
            Search
          </h1>
        </div>
      </div>

      <div>
        <SearchBar initialQuery={query} />
      </div>
    </div>
  );
}
