"use client";
import React from "react";
import { ContentMode } from "@/types/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import useWatchLater from "@/hooks/useWatchLater";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setContentMode } from "@/store/features/uiSlice";
import useWatchHistory from "@/hooks/useWatchHistory";
import { useRouter } from "next/navigation";
import { TMDBContent } from "./videoContainer";

export default function VideoFrame({
  contentType,
  contentDetails,
  videoKey,
}: {
  contentType: ContentMode;
  contentDetails: TMDBContent;
  videoKey: string;
}) {
  const { handleAddToWatchLater, handleRemoveFromWatchLater } = useWatchLater();

  const watchLaterMovies = useAppSelector(
    (state) => state.libraryData.watchLater.movies
  );
  const watchLaterTV = useAppSelector(
    (state) => state.libraryData.watchLater.tv
  );
  const currentWatchLater =
    contentType === "movie" ? watchLaterMovies : watchLaterTV;

  const existInWatchLater = currentWatchLater.some(
    (item) => Number(item.id) === Number(contentDetails?.id)
  );

  const dispatch = useAppDispatch();
  const { handleAddToWatchHistory } = useWatchHistory();
  const { push } = useRouter();

  const handleWatchLater = () => {
    if (existInWatchLater) {
      handleRemoveFromWatchLater(contentType, contentDetails.id as number);
    } else {
      handleAddToWatchLater({
        contentType,
        contentDetails: contentDetails as Record<string, unknown>,
      });
    }
  };

  const handlePlayClick = () => {
    if (contentType === "movie") {
      dispatch(setContentMode("movie"));
      handleAddToWatchHistory({ contentType, contentDetails: contentDetails });
      push(`/movie-details/${contentDetails.id}`);
    } else {
      dispatch(setContentMode("tv"));
      handleAddToWatchHistory({ contentType, contentDetails: contentDetails });
      push(`/tv-series-details/${contentDetails.id}`);
    }
  };

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-black select-none">
      <iframe
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}&modestbranding=1&rel=0&disablekb=1&fs=0&playsinline=1&start=0&end=54&vq=hd1080`}
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent" />

      {contentDetails && <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute max-w-lg bottom-25 left-5 hidden md:flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-4xl text-white text-shadow-lg">
            {(contentDetails?.name || contentDetails?.title) as string}
          </h2>
          <p className="text-xl text-white/80 text-shadow-lg line-clamp-3">
            {(contentDetails?.overview as string) || "the"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handlePlayClick}
            className={cn(
              "text-white text-xl rounded-md font-medium hover:opacity-90 cursor-pointer px-4 py-1.5",
              contentType === "movie"
                ? "bg-gradient-to-br from-movie-primary to-sky-600"
                : "bg-gradient-to-br from-tv-primary to-pink-400"
            )}
          >
            Play now
          </button>
          <button
            onClick={handleWatchLater}
            className="text-white text-xl rounded-md font-medium hover:bg-white/30 cursor-pointer px-4 py-1.5"
          >
            {existInWatchLater ? "Remove" : "Watch later"}
          </button>
        </div>
      </motion.div>}
    </div>
  );
}
