"use client";
import FilledBookMark from "@/assets/svgs/FilledBookMark";
import PinkHeartIcon from "@/assets/svgs/PinkHeartIcon";
import useFavorite from "@/hooks/useFavorite";
import useWatchHistory from "@/hooks/useWatchHistory";
import useWatchLater from "@/hooks/useWatchLater";
import { BaseImageUrl } from "@/lib/constants";
import { useAppSelector } from "@/store/hooks";
import { CardCategory } from "@/types/types";
import { CircleX } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface TMDBItem {
  id: number;
  adult: boolean;
  original_title?: string;
  poster_path?: string;
  original_name?: string;
}

export default function LibraryCards({
  cardCategory,
}: {
  cardCategory: CardCategory;
}) {
  const favorites = useAppSelector((state) => state.libraryData.favorites);
  const watchLater = useAppSelector((state) => state.libraryData.watchLater);
  const watchHistory = useAppSelector(
    (state) => state.libraryData.watchHistory
  );
  const { handleRemoveFromFavorite } = useFavorite();
  const { handleRemoveFromWatchLater } = useWatchLater();
  const { handleRemoveFromWatchHistory } = useWatchHistory();

  const firstList =
    (cardCategory === "favorite" && favorites.movies) ||
    (cardCategory === "watchLater" && watchLater.movies) ||
    [];

  const secondList =
    (cardCategory === "favorite" && favorites.tv) ||
    (cardCategory === "watchLater" && watchLater.tv) ||
    [];

  const handleMovieClick = (id: number) => {
    if (cardCategory === "favorite") {
      handleRemoveFromFavorite("movie", id);
    } else if (cardCategory === "watchLater") {
      handleRemoveFromWatchLater("movie", id);
    }
  };

  const handleTVClick = (id: number) => {
    if (cardCategory === "watchLater") {
      handleRemoveFromWatchLater("tv", id);
    } else if (cardCategory === "favorite") {
      handleRemoveFromFavorite("tv", id);
    }
  };

  const handleWatchHistoryClick = (id: number) => {
    if (cardCategory === "watchHistory") {
      handleRemoveFromWatchHistory(id);
    }
  };

  return (
    <div>
      <div>
        {(cardCategory === "favorite" || cardCategory === "watchLater") && (
          <div className="h-10 border-b flex items-center">
            <h2 className="font-medium tracking-tight px-4 mx-auto">Movies</h2>
          </div>
        )}
        <div className="relative w-full flex transition-all duration-300 divide-x border-b overflow-x-scroll scroll-hide">
          {firstList.map((item, index) => (
            <div
              key={item.id as number ?? index}
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
                {(item.original_title as string) ||
                  (item.original_name as string)}
              </p>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => handleMovieClick(item.id as number)}
                    className="absolute top-1 right-1 z-10 bg-background rounded-full p-1 group-hover:scale-[1.2] transition-all duration-300 ease-in-out text-muted-foreground hover:text-foreground opacity-30 group-hover:opacity-100"
                  >
                    {cardCategory === "favorite" ? (
                      <PinkHeartIcon className="size-4" />
                    ) : (
                      <FilledBookMark className="size-4" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{`Remove from ${
                    cardCategory === "favorite"
                      ? "favorite"
                      : cardCategory === "watchLater" && "watch later"
                  }`}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>

      <div>
        {(cardCategory === "favorite" || cardCategory === "watchLater") && (
          <div className="h-10 border-b flex items-center">
            <h2 className="font-medium tracking-tight px-4 mx-auto">
              TV Series
            </h2>
          </div>
        )}
        <div className="relative w-full flex transition-all duration-300 divide-x overflow-x-scroll scroll-hide">
          {secondList.map((item) => (
            <div
              key={item.id as number}
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
              <p className="border-t px-4 py-2 truncate whitespace-nowrap overflow-hidden w-full text-foreground/80 group-hover:text-foreground relative">
                {(item.original_title as string) ||
                  (item.original_name as string)}
              </p>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => handleTVClick(item.id as number)}
                    className="absolute top-1 right-1 z-10 bg-background rounded-full p-1 group-hover:scale-[1.2] transition-all duration-300 ease-in-out text-muted-foreground hover:text-foreground opacity-30 group-hover:opacity-100"
                  >
                    {cardCategory === "favorite" ? (
                      <PinkHeartIcon className="size-4" />
                    ) : (
                      <FilledBookMark className="size-4" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{`Remove from ${
                    cardCategory === "favorite"
                      ? "favorite"
                      : cardCategory === "watchLater" && "watch later"
                  }`}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full flex transition-all duration-300 divide-x overflow-x-scroll scroll-hide">
        {cardCategory === "watchHistory" &&
          watchHistory.map((item) => (
            <div
              key={item.contentDetails.id as number}
              className="relative flex-shrink-0 group max-w-fit w-[160px] cursor-pointer"
            >
              <div className="relative flex flex-col items-center px-4 py-6">
                <Image
                  width={128}
                  height={192}
                  src={`${BaseImageUrl}${
                    item.contentDetails.poster_path as string
                  }`}
                  alt="poster image"
                  priority
                  className="object-cover rounded-lg group-hover:scale-[1.2] transition-all duration-300 ease-in-out group-hover:z-10 group-hover:shadow-2xl"
                />
              </div>
              <p className="border-t px-4 py-2 truncate whitespace-nowrap overflow-hidden w-full text-foreground/80 group-hover:text-foreground">
                {(item.contentDetails.original_title as string) ||
                  (item.contentDetails.original_name as string)}
              </p>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    onClick={() =>
                      handleWatchHistoryClick(item.contentDetails.id as number)
                    }
                    className="absolute top-1 right-1 z-10 bg-background rounded-full p-0.5 group-hover:scale-[1.2] transition-all duration-300 ease-in-out text-muted-foreground hover:text-foreground opacity-30 group-hover:opacity-100"
                  >
                    <CircleX className="size-4" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete from watch history.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
      </div>
    </div>
  );
}
