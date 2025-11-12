import Footer from "@/components/Footer";
import HomeNav from "@/components/HomeNav";
import SearchBar from "@/components/SearchBar";
import { BASE_URL } from "@/lib/constants";
import { Languages } from "@/types/types";
import { languageConfig } from "@/lib/languages";
import { Suspense } from "react";
import ListSkeleton from "@/components/skeletons/listSkeleton";
import List from "@/components/List";
import AIResultsWrapper from "@/components/AIResultsWrapper";
import AIResultsSkeleton from "@/components/skeletons/AISearchLoader";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    adult?: string;
    aiMode?: string;
    language?: Languages;
  }>;
}) {
  const {
    query = "",
    adult = "false",
    aiMode = "false",
    language = "en",
  } = await searchParams;

  if (!query.trim()) {
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

        <div>
          <SearchBar initialQuery={query} />
        </div>

        <div className="border-b border-dashed border-foreground/30 ">
          <div className="max-w-7xl w-full mx-auto border-x text-center px-4">
            <h1 className="text-xl tracking-tight text-muted-foreground leading-relaxed w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center">
              {languageConfig[language].searchBar.emptyQueryError}
            </h1>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  const movieUrl = `${BASE_URL}/search/movie?query=${query}&include_adult=${adult}&language=en-US&page=1`;
  const tvUrl = `${BASE_URL}/search/tv?query=${query}&include_adult=${adult}&language=en-US&page=1`;

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

      <div>
        <SearchBar initialQuery={query} />
      </div>

      <div className="min-h-[60vh] border-x max-w-7xl mx-auto">
        <div className="border-b border-foreground/30 border-dashed h-full">
          <div className="max-w-7xl mx-auto h-full">
            {aiMode === "true" ? (
              <Suspense key={`ai-${query}`} fallback={<AIResultsSkeleton />}>
                <AIResultsWrapper query={query} />
              </Suspense>
            ) : (
              <div key={`tmdb-${query}`}>
                <Suspense fallback={<ListSkeleton />}>
                  <List title="Movies" url={movieUrl} />
                </Suspense>

                <Suspense fallback={<ListSkeleton />}>
                  <List title="TV Series" url={tvUrl} />
                </Suspense>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
