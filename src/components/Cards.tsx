"use client";
import useWatchHistory from "@/hooks/useWatchHistory";
import { BaseImageUrl } from "@/lib/constants";
import { setContentMode } from "@/store/features/uiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cards({ list }: { list: Record<string, unknown>[] }) {
  const { push } = useRouter();
  const currentContentMode = useAppSelector(
    (state) => state.uiData.contentMode
  );
  const dispatch = useAppDispatch();
  const { handleAddToWatchHistory } = useWatchHistory();

  const handleCard = (id: number, contentDetails: Record<string, unknown>) => {
    if (currentContentMode === "movie") {
      dispatch(setContentMode("movie"));
      handleAddToWatchHistory({ contentType: "movie", contentDetails });
      push(`/movie-details/${id}`);
    } else {
      dispatch(setContentMode("tv"));
      handleAddToWatchHistory({
        contentType: "tv",
        contentDetails: contentDetails,
      });
      push(`/tv-series-details/${id}`);
    }
  };

  return (
    <div className="relative w-full flex transition-all duration-300 divide-x">
      {list.map((item) => (
        <div
          key={item.id as number}
          onClick={() => handleCard(item.id as number, item)}
          className="relative flex-shrink-0 group max-w-fit w-[160px] cursor-pointer"
        >
          <div className="relative flex flex-col items-center px-4 py-6">
            <Image
              width={128}
              height={192}
              src={`${BaseImageUrl}${item.poster_path as string}`}
              alt="poster image"
              priority
              className="object-cover rounded-lg group-hover:scale-[1.2] transition-all duration-300 ease-in-out group-hover:z-10 group-hover:shadow-2xl"
            />
          </div>
          <p className="border-t px-4 py-2 truncate whitespace-nowrap overflow-hidden w-full text-foreground/80 group-hover:text-foreground">
            {(item.original_title || item.original_name) as string}
          </p>
        </div>
      ))}
    </div>
  );
}
