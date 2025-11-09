"use client";
import useFavorite from "@/hooks/useFavorite";
import useWatchHistory from "@/hooks/useWatchHistory";
import useWatchLater from "@/hooks/useWatchLater";
import { Image_BASE_URL } from "@/lib/constants";
import { useAppSelector } from "@/store/hooks";
import { CardCategory } from "@/types/types";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import EmptyState from "./EmptyState";
import { cn } from "@/lib/utils";
import fallBackPoster from "@/assets/images/movie_fallback.jpeg";

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
  const { handleRemoveFromWatchHistory, handleClearWatchHistory } =
    useWatchHistory();

  const firstList =
    (cardCategory === "favorite" && favorites?.movies) ||
    (cardCategory === "watchLater" && watchLater?.movies) ||
    [];

  const secondList =
    (cardCategory === "favorite" && favorites?.tv) ||
    (cardCategory === "watchLater" && watchLater?.tv) ||
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
    <div className="relative">
      {cardCategory === "watchHistory" && watchHistory?.length > 0 && (
        <Button
          onClick={handleClearWatchHistory}
          variant="secondary"
          size={"sm"}
          className="hover:text-destructive absolute right-2 -top-10 cursor-pointer"
        >
          Clear history
        </Button>
      )}

      <div>
        {(cardCategory === "favorite" || cardCategory === "watchLater") && (
          <div className="h-10 border-b flex items-center">
            <h2 className="font-medium text-xl tracking-tight px-4 mx-auto">
              Movies
              <span className="text-sm ml-2 text-muted-foreground">
                ({firstList.length})
              </span>
            </h2>
          </div>
        )}
        <div className="relative w-full flex transition-all duration-300 divide-x border-b overflow-x-scroll scroll-hide">
          {firstList.length > 0 ? (
            firstList.map((item, index) => (
              <div
                key={(item.id as number) ?? index}
                className={cn(
                  "relative flex-shrink-0 group max-w-fit w-[160px] cursor-pointer",
                  index === watchHistory?.length - 1 && "border-b"
                )}
              >
                <div className="flex flex-col h-[280px] w-full justify-between">
                  <div className="relative flex flex-1 items-center justify-center px-4 py-6">
                    <Image
                      width={128}
                      height={192}
                      src={
                        item?.poster_path
                          ? `${Image_BASE_URL}${item.poster_path as string}`
                          : fallBackPoster
                      }
                      alt="poster image"
                      loading="lazy"
                      priority={false}
                      className="object-cover select-none rounded-lg group-hover:scale-[1.2] transition-all duration-300 ease-in-out group-hover:z-10 group-hover:shadow-2xl"
                    />
                  </div>
                  <p className="border-t px-4 py-2 truncate whitespace-nowrap overflow-hidden w-full text-foreground/80 group-hover:text-foreground">
                    {(item.title as string) || (item.name as string)}
                  </p>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMovieClick(item.id as number);
                      }}
                      className="absolute top-1 right-1 z-10 bg-background rounded-full p-1 group-hover:scale-[1.2] transition-all duration-300 ease-in-out text-destructive opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="size-4.5" />
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
            ))
          ) : cardCategory === "favorite" ? (
            <EmptyState
              message="You haven’t added any favorite movies yet!"
              contentType="movie"
            />
          ) : (
            cardCategory !== "watchHistory" && (
              <EmptyState
                message="Your Watch Later movie list is empty."
                contentType="movie"
              />
            )
          )}
        </div>
      </div>

      <div>
        {(cardCategory === "favorite" || cardCategory === "watchLater") && (
          <div className="h-10 border-b flex items-center">
            <h2 className="font-medium text-xl tracking-tight px-4 mx-auto">
              TV Series{" "}
              <span className="text-sm ml-1 text-muted-foreground">
                ({secondList.length})
              </span>
            </h2>
          </div>
        )}
        <div className="relative w-full flex transition-all duration-300 divide-x overflow-x-scroll scroll-hide">
          {secondList.length > 0 ? (
            secondList.map((item, index) => (
              <div
                key={item.id as number}
                className={cn(
                  "relative flex-shrink-0 group max-w-fit w-[160px] cursor-pointer",
                  index === watchHistory?.length - 1 && "border-b"
                )}
              >
                <div className="flex flex-col h-[280px] w-full justify-between">
                  <div className="relative flex flex-1 items-center justify-center px-4 py-6">
                    <Image
                      width={128}
                      height={192}
                      src={
                        item?.poster_path
                          ? `${Image_BASE_URL}${item.poster_path as string}`
                          : fallBackPoster
                      }
                      alt="poster image"
                      loading="lazy"
                      priority={false}
                      className="object-cover select-none rounded-lg group-hover:scale-[1.2] transition-all duration-300 ease-in-out group-hover:z-10 group-hover:shadow-2xl"
                    />
                  </div>
                  <p className="border-t px-4 py-2 truncate whitespace-nowrap overflow-hidden w-full text-foreground/80 group-hover:text-foreground relative">
                    {(item.title as string) || (item.name as string)}
                  </p>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTVClick(item.id as number);
                      }}
                      className="absolute top-1 right-1 z-10 bg-background rounded-full p-1 group-hover:scale-[1.2] transition-all duration-300 ease-in-out text-destructive opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="size-4.5" />
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
            ))
          ) : cardCategory === "favorite" ? (
            <EmptyState
              message="You haven’t added any favorite tv-series yet!"
              contentType="tv"
            />
          ) : (
            cardCategory !== "watchHistory" && (
              <EmptyState
                message="Your Watch Later tv-series list is empty."
                contentType="tv"
              />
            )
          )}
        </div>
      </div>

      <div className="relative w-full flex transition-all duration-300 divide-x overflow-x-scroll scroll-hide">
        {cardCategory === "watchHistory" && watchHistory?.length > 0
          ? watchHistory?.map((item, index) => (
              <div
                key={item.contentDetails.id as number}
                className={cn(
                  "relative flex-shrink-0 group max-w-fit w-[160px] cursor-pointer",
                  index === watchHistory?.length - 1 && "border-b"
                )}
              >
                <div className="flex flex-col h-[280px] w-full justify-between">
                  <div className="flex-1 flex items-center justify-center px-4 py-6">
                    <Image
                      width={128}
                      height={192}
                      src={
                        item.contentDetails.poster_path
                          ? `${Image_BASE_URL}${
                              item.contentDetails.poster_path as string
                            }`
                          : fallBackPoster
                      }
                      alt="poster image"
                      loading="lazy"
                      priority={false}
                      className="object-cover select-none rounded-lg max-h-[192px] group-hover:scale-[1.2] transition-all duration-300 ease-in-out group-hover:z-10 group-hover:shadow-2xl"
                    />
                  </div>

                  <p className="border-t px-4 py-2 truncate whitespace-nowrap overflow-hidden w-full text-foreground/80 group-hover:text-foreground">
                    {(item.contentDetails.title as string) ||
                      (item.contentDetails.name as string)}
                  </p>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWatchHistoryClick(
                          item.contentDetails.id as number
                        );
                      }}
                      className="absolute top-2 right-2 z-10 bg-background rounded-full p-1 group-hover:scale-[1.2] transition-all duration-300 ease-in-out text-destructive group-hover:text-destructive opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="size-4.5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete from watch history.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))
          : cardCategory === "watchHistory" && (
              <EmptyState message="Your have not watched anything yet!" />
            )}
      </div>
    </div>
  );
}
