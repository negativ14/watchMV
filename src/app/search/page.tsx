import Footer from "@/components/Footer";
import HomeNav from "@/components/HomeNav";
import SearchBar from "@/components/SearchBar";
import { BASE_URL, buildPrompt } from "@/lib/constants";
import fetchTMDB from "@/lib/fetchTMDB";
import { ai } from "@/lib/ai";
import { Languages } from "@/types/types";
import { languageConfig } from "@/lib/languages";
import { Suspense } from "react";
import ListSkeleton from "@/components/skeletons/listSkeleton";
import List from "@/components/List";

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

  let movies: Record<string, unknown>[] = [];
  let tv: Record<string, unknown>[] = [];
  const movieUrl = `${BASE_URL}/search/movie?query=${query}&include_adult=${adult}&language=en-US&page=1`;
  const tvUrl = `${BASE_URL}/search/tv?query=${query}&include_adult=${adult}&language=en-US&page=1`;

  if (aiMode === "true") {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: buildPrompt(query),
      });

      if (response?.text) {
        let aiText = response?.text;
        aiText = aiText
          .replace(/^```json\s*/i, "")
          .replace(/^```/, "")
          .replace(/```$/, "")
          .trim();
        if (aiText) {
          const aiData = JSON.parse(aiText);
          const moviePromises = aiData?.movies.map((id: number) =>
            fetchTMDB(`${BASE_URL}/movie/${id}?language=en-US`)
          );
          const tvPromises = aiData?.tv?.map((id: number) =>
            fetchTMDB(`${BASE_URL}/tv/${id}?language=en-US`)
          );

          const movieResults = await Promise.allSettled(moviePromises);
          const tvResults = await Promise.allSettled(tvPromises);

          const successfullMovies = movieResults
            .filter((item) => item.status === "fulfilled")
            .map((result) =>
              result.status === "fulfilled" ? result.value : null
            );

          const successfullTV = tvResults
            .filter((item) => item.status === "fulfilled")
            .map((result) =>
              result.status === "fulfilled" ? result.value : null
            );

          movies = successfullMovies
            .filter((item) => !item.error)
            .map((item) => item.data);

          tv = successfullTV
            .filter((item) => !item.error)
            .map((item) => item.data);
        }
      }
    } catch (error) {
      console.error("Could not parse AI JSON:", error);
    }
  }
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
        {aiMode === "true" && movies?.length === 0 && tv?.length === 0 && (
          <div className="border-b border-dashed border-foreground/30 mt-6 min-h-[60vh] flex items-center justify-center">
            <div className="max-w-7xl mx-auto border-x text-center px-4">
              <h1 className="text-xl tracking-tight text-muted-foreground leading-relaxed">
                {languageConfig[language].searchBar.lengthZeroError.error1}
                <br />
                {languageConfig[language].searchBar.lengthZeroError.error2}
              </h1>
            </div>
          </div>
        )}

        <div className="border-b border-foreground/30 border-dashed">
          <div className="max-w-7xl mx-auto">
            {movies?.length > 0 && aiMode === "true" ? (
              <List title="Movies" dataList={movies} />
            ) : (
              <Suspense fallback={<ListSkeleton />}>
                {" "}
                <List title="Movies" url={movieUrl} />{" "}
              </Suspense>
            )}
            
            {tv?.length > 0 && aiMode === "true" ? (
              <List title="TV Series" dataList={tv} />
            ) : (
              <Suspense fallback={<ListSkeleton />}>
                {" "}
                <List title="TV Series" url={tvUrl} />{" "}
              </Suspense>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
