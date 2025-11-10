"use client";

import { Bookmark, Heart } from "lucide-react";
import { IContentDetails } from "./ContentDetails";
import { Badge } from "../ui/badge";
import BasicCards from "../BasicCards";
import { ContentMode } from "@/types/types";
import { useAppSelector } from "@/store/hooks";
import PinkHeartIcon from "@/assets/svgs/PinkHeartIcon";
import FilledBookMark from "@/assets/svgs/FilledBookMark";
import useWatchLater from "@/hooks/useWatchLater";
import useFavorite from "@/hooks/useFavorite";

export default function Details({
  content,
  contentType,
  id,
}: {
  content: IContentDetails;
  contentType: ContentMode;
  id: number;
}) {
  const favoriteMovies = useAppSelector(
    (state) => state.libraryData.favorites.movies
  );
  const favoriteTV = useAppSelector((state) => state.libraryData.favorites.tv);
  const favoriteArray = contentType === "movie" ? favoriteMovies : favoriteTV;
  const isFavorite = favoriteArray.some(
    (item) => Number(item.id) === Number(id)
  );

  const watchLaterMovies = useAppSelector(
    (state) => state.libraryData.watchLater.movies
  );
  const watchLaterTV = useAppSelector(
    (state) => state.libraryData.watchLater.tv
  );
  const watchLaterArray =
    contentType === "movie" ? watchLaterMovies : watchLaterTV;
  const isInWatchLater = watchLaterArray.some(
    (item) => Number(item.id) === Number(id)
  );
  const { handleAddToWatchLater, handleRemoveFromWatchLater } = useWatchLater();
  const { handleAddToFavorite, handleRemoveFromFavorite } = useFavorite();

  const handleWatchLater = () => {
    if (isInWatchLater) {
      handleRemoveFromWatchLater(contentType, id);
    } else {
      handleAddToWatchLater({
        contentType,
        contentDetails: content as unknown as Record<string, unknown>,
      });
    }
  };

  const handleFavorite = () => {
    if (isFavorite) {
      handleRemoveFromFavorite(contentType, id);
    } else {
      handleAddToFavorite(
        contentType,
        content as unknown as Record<string, unknown>
      );
    }
  };

  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex items-center justify-between divide-x px-4 py-1 border-b">
        <h1 className="text-xl md:text-3xl text-muted-foreground font-semibold whitespace-nowrap truncate overflow-hidden tracking-tighter">
          Title:{" "}
          <span className="text-foreground md:text-4xl text-2xl">
            {content.name || content.title || "No details available"}
          </span>
        </h1>
        <div className="flex items-center gap-4 opacity-90">
          <Badge variant={"default"}>{content.status}</Badge>
          <span className="cursor-pointer" onClick={handleFavorite}>
            {isFavorite ? (
              <PinkHeartIcon className="size-6" />
            ) : (
              <Heart className="size-6" />
            )}
          </span>
          <span className="cursor-pointer" onClick={handleWatchLater}>
            {isInWatchLater ? (
              <FilledBookMark className="size-6" />
            ) : (
              <Bookmark className="size-6" />
            )}
          </span>
        </div>
      </div>

      <div className="px-4 py-1 flex flex-col gap-1">
        <h2 className="text-lg font-medium text-muted-foreground">Overview:</h2>
        <p className="text-lg text-foreground tracking-tighter">
          {content.overview || "No details available"}
        </p>
      </div>

      <h2 className="flex items-baseline gap-2 px-4 py-1 text-lg text-muted-foreground">
        Release Date:{" "}
        <p className="text-xl text-foreground tracking-tight">
          {content.release_date ||
            content.first_air_date ||
            "No details available"}
        </p>
      </h2>

      <h2 className="flex items-center gap-2 text-muted-foreground text-lg px-4 py-1">
        Ratings:{" "}
        <p className="text-foreground text-xl tracking-tight">
          {content.vote_average / 2 || "No details available"}
        </p>
      </h2>

      <h2 className="flex items-center gap-2 text-muted-foreground text-lg px-4 py-1">
        Popularity:{" "}
        <p className="text-foreground tracking-tight text-xl">
          {content.popularity || "No details available"}
        </p>
      </h2>

      <div className="flex items-center gap-2 border-y py-2 px-4">
        <div className="flex-1 flex items-center gap-2 flex-wrap">
          <h2 className="text-lg text-muted-foreground">Genres:</h2>
          {content?.genres?.length ? (
            content.genres.map((item) => (
              <Badge
                variant="secondary"
                key={item.id}
                className="text-sm font-light"
              >
                {item.name}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-sm">
              No details available
            </span>
          )}
        </div>
      </div>

      {contentType === "tv" && (
        <div className="grid grid-cols-1 md:grid-cols-2 border-y md:divide-x divide-y">
          <h2 className="text-muted-foreground text-lg py-1 px-4">
            Number of Episodes:{" "}
            <span className="text-foreground text-xl tracking-tight">
              {content.number_of_episodes || "No details available"}
            </span>
          </h2>
          <h2 className="text-muted-foreground text-lg py-1 px-4">
            Number of Season:{" "}
            <span className="text-foreground text-xl tracking-tight">
              {content.number_of_seasons || "No details available"}
            </span>
          </h2>
        </div>
      )}

      {content.seasons !== undefined && content?.seasons?.length > 0 && (
        <div className="overflow-x-scroll scroll-hide">
          <BasicCards
            cardType="poster"
            seasons={content?.seasons || "No details available"}
          />
        </div>
      )}
      <div className="h-5"></div>
    </div>
  );
}
