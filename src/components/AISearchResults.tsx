import { BASE_URL } from "@/lib/constants";
import { ContentMode } from "@/types/types";
import fetchTMDB from "@/lib/fetchTMDB";
import Cards from "./Cards";

export default async function AISearchResults({
  idArray,
  contentType,
}: {
  idArray: number[];
  contentType: ContentMode;
}) {
  const allPromises = idArray?.map((id) =>
    fetchTMDB(`${BASE_URL}/${contentType}/${id}?language=en-US`)
  );

  const allResults = await Promise.allSettled(allPromises);
  const list = allResults
    .filter((item) => item.status === "fulfilled")
    .filter((item) => !item.value?.error)
    .map((item) => item.value?.data);

  if (!idArray || idArray?.length === 0) {
    return (
      <div className="border-b border-foreground/30">
        <div className="relative max-w-7xl mx-auto h-20">
          <h2 className="text-xl font-semibold tracking-tight text-center py-1 border-t">
            No {contentType === "movie" ? "Movies" : "TV Series"} Available
          </h2>
          <div className="relative h-10 border-t">
            <div className="absolute opacity-80 inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full border-b">
        {list?.length > 0 && (
          <div className="max-w-7xl mx-auto border-x overflow-hidden">
            <h2 className="font-semibold text-2xl tracking-tight border-b border-dashed px-4 py-2">
              {contentType === "movie" ? "Movies" : "TV Series"}
            </h2>
            <div className="overflow-x-scroll scroll-hide">
              <Cards list={list} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
