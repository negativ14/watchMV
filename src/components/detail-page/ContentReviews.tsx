import fetchTMDB from "@/lib/fetchTMDB";
import { BASE_URL } from "@/lib/constants";
import { ContentMode } from "@/types/types";
import Reviews from "./Reviews";
import { movieData } from "@/mock/movie";
import { tvData } from "@/mock/tv";

export interface IReview {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export default async function ContentReviews({
  contentType,
  id,
}: {
  contentType: ContentMode;
  id: number;
}) {
  const url = `${BASE_URL}/${contentType}/${id}/reviews?language=en-US&page=1`;
  const data = await fetchTMDB(url);

  let reviews;
  reviews = data?.data?.results;

  if (data?.error) {
    reviews = contentType === "movie" ? movieData.reviews : tvData.reviews;
  }

  if (!data?.error && data?.empty) {
    return (
      <div className="border-b border-dashed border-foreground/30">
        <div className="max-w-7xl mx-auto border-x">
          <h1 className=" font-semibold tracking-tight px-4 py-1 text-2xl">
            No Reviews Available!
          </h1>
          <div className="h-10 border-t" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Reviews reviews={reviews} />
    </div>
  );
}
