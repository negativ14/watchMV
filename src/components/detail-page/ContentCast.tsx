import fetchTMDB from "@/lib/fetchTMDB";
import { BASE_URL } from "@/lib/constants";
import { ContentMode } from "@/types/types";
import Image from "next/image";

type CastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  character: string;
  credit_id: string;
  order: number;
};

export default async function ContentCast({
  contentType,
  id,
}: {
  contentType: ContentMode;
  id: number;
}) {
  const url = `${BASE_URL}/${contentType}/${id}/credits?language=en-US`;
  const data = await fetchTMDB(url);
  const cast = data?.cast || [];

  return (
    <div className="max-h-[100px]">
      {cast.slice(0, 6).map((person: CastMember) => (
        <div key={person.id}>
          <Image
            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
            alt={person.name}
            fill
            className="h-10 w-auto relative"
          />
          <p>{person.name}</p>
          <p>{person.character}</p>
        </div>
      ))}
    </div>
  );
}

//https://api.themoviedb.org/3/tv/series_id/credits?language=en-US

// "cast": [
//     {
//       "adult": false,
//       "gender": 2,
//       "id": 22970,
//       "known_for_department": "Acting",
//       "name": "Peter Dinklage",
//       "original_name": "Peter Dinklage",
//       "popularity": 30.6,
//       "profile_path": "/lRsRgnksAhBRXwAB68MFjmTtLrk.jpg",
//       "character": "Tyrion Lannister",
//       "credit_id": "5256c8b219c2956ff6047cd8",
//       "order": 0
//     },
