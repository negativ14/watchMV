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

  return (
    <div className="border-b border-foreground/30 border-dashed">
      <div className="max-w-7xl mx-auto border-x flex flex-col">
        <h2 className="text-xl tracking-tight px-4 py-2">Cast</h2>
        <div className="overflow-x-scroll scroll-hide">
          <BasicCards cardType="cast" cast={cast} />
        </div>
      </div>
    </div>
  );
}


