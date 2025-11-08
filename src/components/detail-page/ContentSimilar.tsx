import { BASE_URL } from "@/lib/constants";
import { ContentMode } from "@/types/types";
import List from "../List";

export default async function ContentSimilar({
  contentType,
  id,
}: {
  contentType: ContentMode;
  id: number;
}) {
  const url = `${BASE_URL}/${contentType}/${id}/similar?language=en-US&page=1`;
    // const url = "https://api.themoviedb.org/3/movie/640146/recommendations?language=en-US&page=1";
  return (
    <div className="border-b border-foreground/30 border-dashed">
      <div className="max-w-7xl mx-auto overflow-x-scroll scroll-hide">
        <List title="Similar" url={url} />
        <div className="h-10 border-t" />
      </div>
    </div>
  );
}
