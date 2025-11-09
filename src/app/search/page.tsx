import Cards from "@/components/Cards";
import Footer from "@/components/Footer";
import HomeNav from "@/components/HomeNav";
import SearchBar from "@/components/SearchBar";
import { BASE_URL, buildPrompt } from "@/lib/constants";
import fetchTMDB from "@/lib/fetchTMDB";
import { ai } from "@/lib/ai";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; adult?: string; aiMode?: string }>;
}) {
  const { query = "", adult = "false", aiMode = "false" } = await searchParams;

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

        <div className="border-b border-dashed border-foreground/30 mt-6 min-h-[60vh] md:min-h-[70vh] flex items-center justify-center">
          <div className="max-w-7xl mx-auto border-x text-center px-4">
            <h1 className="text-xl font-semibold tracking-tight text-muted-foreground leading-relaxed">
              Start typing above to search for your favorite movies or shows!!
            </h1>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  let movies;
  let tv;
  let data;

  if (aiMode === "false") {
    const url = `${BASE_URL}/search/multi?query=${query}&include_adult=${adult}&language=en-US&page=1`;
    data = await fetchTMDB(url);
    console.log("the search data is", data.data);
    movies = data?.data?.results?.filter(
      (item: Record<string, unknown>) => !!item?.title && !!item.poster_path
    );
    tv = data?.data?.results?.filter(
      (item: Record<string, unknown>) =>
        !!item?.name && !!item?.first_air_date && !!item?.poster_path
    );
  } else {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
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

          if (movies.length === 0 && tv.length === 0) {
            return (
              <div className="border-b border-dashed border-foreground/30 mt-6 min-h-[60vh] flex items-center justify-center">
                <div className="max-w-7xl mx-auto border-x text-center px-4">
                  <h1 className="text-xl font-semibold tracking-tight text-muted-foreground leading-relaxed">
                    Hmm... couldn’t find anything that matches your request!!!
                    <br />
                    Try refining your prompt — or maybe Gemini just had a nap!
                  </h1>
                </div>
              </div>
            );
          }
        }
      }
    } catch (error) {
      console.error("Could not parse AI JSON:", error);

      <div className="border-b border-dashed border-foreground/30 mt-6 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto border-x text-center px-4">
          <h1 className="text-xl font-semibold tracking-tight text-muted-foreground">
            Gemini sent something weird!!!!!
            <br />
            Please try again!
          </h1>
        </div>
      </div>;
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

      {(data?.error || data?.empty) && (
        <div className="border-b border-dashed border-foreground/30 mt-4 ">
          <div className="max-w-7xl mx-auto border-x border-b">
            <h1 className="font-semibold tracking-tight px-4 py-1 text-xl flex justify-center md:items-center text-muted-foreground min-h-[60vh]">
              Oops! TMDB didn’t feel like responding!!
              <br />
              This is a free API — give it another shot in a bit!
            </h1>
            <div className="h-10 border-t" />
          </div>
        </div>
      )}

      <div className="border-b border-foreground/30 border-dashed">
        <div className="max-w-7xl mx-auto">
          {movies && (
            <div className="border-b border-x">
              <h2 className="px-4 py-1 text-2xl font-sembold tracking-tight border-b">
                Movies
              </h2>
              <div className="overflow-x-scroll scroll-hide">
                <Cards list={movies} />
              </div>
            </div>
          )}
          {tv && (
            <div className="border-x">
              <h2 className="px-4 py-1 text-2xl font-sembold tracking-tight border-b">
                TV Series
              </h2>
              <div className="overflow-x-scroll scroll-hide">
                <Cards list={tv} />
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
