import fetchTMDB from "@/lib/fetchTMDB";
import { BASE_URL } from "@/lib/constants";
import { ContentMode } from "@/types/types";
import Details from "./Details";
import { movieData } from "@/mock/movie";
import { tvData } from "@/mock/tv";

export interface IContentDetails {
  title?: string;
  name?: string;
  overview: string;
  release_date?: string;
  status: string | number;
  vote_average: number;
  adult: boolean;
  genres: [{ id: number; name: string }];
  number_of_seasons?: number;
  seasons?: [Record<string, unknown>];
  first_air_date?: string;
  number_of_episodes?: number;
  popularity?: number;
}

export default async function ContentDetails({
  contentType,
  id,
}: {
  contentType: ContentMode;
  id: number;
}) {
  const url = `${BASE_URL}/${contentType}/${id}?language=en-US`;
  //   const url = "shit";
  const data = await fetchTMDB(url);
  let content = data?.data;

  if (data?.error) {
    content = contentType === "movie" ? movieData.details : tvData.details;
  }

  if (!data?.error && !data?.data) {
    return (
      <div className="border-b border-dashed border-foreground/30">
        <div className="max-w-7xl mx-auto border-x">
          <h1 className=" font-semibold tracking-tight px-4 py-1 text-2xl">
            No Data Available!
          </h1>
          <div className="h-10 border-t" />
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-foreground/30 border-dashed">
      <div className="max-w-7xl mx-auto border-x">
        <Details content={content} contentType={contentType} id={id} />
      </div>
    </div>
  );
}
