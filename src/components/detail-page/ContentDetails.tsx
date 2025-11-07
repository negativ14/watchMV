import fetchTMDB from "@/lib/fetchTMDB";
import { BASE_URL } from "@/lib/constants";
import { ContentMode } from "@/types/types";
import Details from "./Details";

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
  seasons?: number;
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
  const data = await fetchTMDB(url);

  if (!data || Object.keys(data).length === 0) {
    return <div>loading..</div>;
  }

  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto">
        <Details content={data} />
      </div>
    </div>
  );
}
