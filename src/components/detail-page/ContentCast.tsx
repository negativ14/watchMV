import fetchTMDB from "@/lib/fetchTMDB";
import { BASE_URL } from "@/lib/constants";
import { ContentMode } from "@/types/types";
import { movieData } from "@/mock/movie";
import { tvData } from "@/mock/tv";
import BasicCards from "../BasicCards";

export default async function ContentCast({
  contentType,
  id,
}: {
  contentType: ContentMode;
  id: number;
}) {
  //   const url = `${BASE_URL}/${contentType}/${id}/credits?language=en-US`;
  const url = "https://api.themoviedb.org/3/movie/6/credits?language=en-US";
  const data = await fetchTMDB(url);
  let cast = [];
  cast = data?.data?.cast || [];

  if (data.error) {
    cast = contentType === "movie" ? movieData.cast : tvData.cast;
  }

  if (!data || data?.data?.cast.length === 0) {
    return (
      <div className="border-b border-dashed border-foreground/30">
        <div className="max-w-7xl mx-auto border-x">
          <h1 className=" font-semibold tracking-tight px-4 py-1 text-2xl">
            No Cast Available!
          </h1>
          <div className="h-10 border-t" />
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-foreground/30 border-dashed">
      <div className="max-w-7xl mx-auto border-x flex flex-col">
        <h2 className="text-2xl font-semibold tracking-tight px-4 py-1">
          Cast
        </h2>
        <div className="overflow-x-scroll scroll-hide">
          <BasicCards cardType="cast" cast={cast} />
        </div>
        <div className="h-10 border-t" />
      </div>
    </div>
  );
}
