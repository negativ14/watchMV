"use client";
import useWatchHistory from "@/hooks/useWatchHistory";
import { Image_BASE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { setContentMode } from "@/store/features/uiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import fallBackPoster from "@/assets/images/movie_fallback.jpeg";

export default function Cards({ list }: { list: Record<string, unknown>[] }) {
  const { push } = useRouter();
  const currentContentMode = useAppSelector(
    (state) => state.uiData.contentMode
  );
  const dispatch = useAppDispatch();
  const { handleAddToWatchHistory } = useWatchHistory();
  const kidMode = useAppSelector((state) => state.userData.kidMode);
  const newList = kidMode ? list.filter((item) => !item.adult) : list;

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
      {newList?.map((item, index) => (
        <div
          key={item.id as number}
          onClick={() => handleCard(item.id as number, item)}
          className={cn(
            "relative flex-shrink-0 group max-w-fit w-[160px] cursor-pointer",
            index === list.length - 1 && "border-r"
          )}
        >
          <div className="flex flex-col justify-between h-[280px] w-full">
            <div className="relative flex items-center justify-center px-4 py-6 flex-1">
              <Image
                width={128}
                height={192}
                loading="lazy"
                priority={false}
                src={
                  item.poster_path
                    ? `${Image_BASE_URL}${item.poster_path as string}`
                    : fallBackPoster
                }
                alt="poster image"
                className="object-cover select-none rounded-lg group-hover:scale-[1.2] transition-all duration-300 ease-in-out group-hover:z-10 group-hover:shadow-2xl"
              />
            </div>
            <p className="border-t px-4 py-2 truncate whitespace-nowrap overflow-hidden w-full text-foreground/80 group-hover:text-foreground">
              {(item.title || item.name) as string}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
