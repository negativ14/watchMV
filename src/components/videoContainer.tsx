"use client";
import {
  BASE_URL,
  FALLBACK_TRAILERS,
  FALLBACK_TV_TRAILERS,
  options,
} from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { ContentMode } from "@/types/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import useWatchLater from "@/hooks/useWatchLater";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import useVideo from "@/hooks/useVideo";
import { setContentMode } from "@/store/features/uiSlice";
import useWatchHistory from "@/hooks/useWatchHistory";
import { useRouter } from "next/navigation";

export type TMDBContent = {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  popularity: number;
  vote_average: number;

  title?: string;
  original_title?: string;
  release_date?: string;

  name?: string;
  original_name?: string;
  first_air_date?: string;
};

export default function VideoContainer({
  contentType,
}: {
  contentType: ContentMode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleAddToWatchLater, handleRemoveFromWatchLater } = useWatchLater();
  const currentContentMode = useAppSelector(
    (state) => state.uiData.contentMode
  );
  const {
    handleSetMovieVideo,
    handleSetTVVideo,
    handleSetMovieKey,
    handleSetTVKey,
  } = useVideo();
  const currentMovie = useAppSelector((state) => state.videoData.movie);
  const currentTV = useAppSelector((state) => state.videoData.tv);
  const currentMovieVideoKey = useAppSelector(
    (state) => state.videoData.movieKey
  );
  const currentTVVideoKey = useAppSelector((state) => state.videoData.tvKey);
  const content = contentType === "movie" ? currentMovie : currentTV;
  const videoKey =
    contentType === "movie" ? currentMovieVideoKey : currentTVVideoKey;
  const watchLaterMovies = useAppSelector(
    (state) => state.libraryData.watchLater.movies
  );
  const watchLaterTV = useAppSelector(
    (state) => state.libraryData.watchLater.tv
  );
  const currentWatchLater =
    contentType === "movie" ? watchLaterMovies : watchLaterTV;

  const existInWatchLater = currentWatchLater.some(
    (item) => item.id === content.id
  );

  const dispatch = useAppDispatch();
  const { handleAddToWatchHistory } = useWatchHistory();
  const { push } = useRouter();

  const handleWatchLater = () => {
    if (existInWatchLater) {
      handleRemoveFromWatchLater(contentType, content.id as number);
    } else {
      handleAddToWatchLater({
        contentType: currentContentMode,
        contentDetails: content as Record<string, unknown>,
      });
    }
  };

  const handlePlayClick = () => {
    if (contentType === "movie") {
      dispatch(setContentMode("movie"));
      handleAddToWatchHistory({ contentType, contentDetails: content });
      push(`/movie-details/${content.id}`);
    } else {
      dispatch(setContentMode("tv"));
      handleAddToWatchHistory({ contentType, contentDetails: content });
      push(`/tv-series-details/${content.id}`);
    }
  };

  const fetchContent = async () => {
    const response = await fetch(
      `${BASE_URL}/${contentType}/popular?language=en-US`,
      options
    );
    const data = await response.json();
    const results = data.results || [];
    const randomItem = results[Math.floor(Math.random() * results.length)];
    return randomItem;
  };

  const fetchVideoDetails = async (contentId: number) => {
    const response = await fetch(
      `${BASE_URL}/${contentType}/${contentId}/videos?language=en-US`,
      options
    );
    const data = await response.json();
    const results = data.results || [];
    const filteredTrailer = results.filter(
      (item: { type: string }) => item.type === "Trailer"
    );
    const filteredTeaser = results.filter(
      (item: { type: string }) => item.type === "Teaser"
    );

    const randomTrailer =
      filteredTrailer[Math.floor(Math.random() * filteredTrailer.length)];
    const randomTeaser =
      filteredTeaser[Math.floor(Math.random() * filteredTeaser.length)];

    return randomTrailer ?? randomTeaser ?? results[0] ?? null;
  };

  useEffect(() => {
    if (contentType === "movie" && currentMovieVideoKey) {
      return;
    }
    if (contentType === "tv" && currentTVVideoKey) {
      return;
    }
    const getVideo = async () => {
      try {
        setIsLoading(true);
        const contentDetails = await fetchContent();
        if (contentType === "movie") {
          handleSetMovieVideo(contentDetails);
        } else {
          handleSetTVVideo(contentDetails);
        }

        const videoDetails = await fetchVideoDetails(contentDetails.id);
        if (!videoDetails?.key) {
          const video = (
            contentType === "tv" ? FALLBACK_TV_TRAILERS : FALLBACK_TRAILERS
          )[
            Math.floor(
              Math.random() *
                (contentType === "tv"
                  ? FALLBACK_TV_TRAILERS.length
                  : FALLBACK_TRAILERS.length)
            )
          ];

          const contentDetails = {
            id: video.id,
            poster_path: video.poster_path,
            backdrop_path: null,
            overview: video.overview,
            popularity: 0,
            vote_average: 0,
            title: video.title,
            original_title: video.title,
            name: video.name,
            original_name: video.name,
          };

          if (contentType === "movie") {
            handleSetMovieVideo(contentDetails);
            handleSetMovieKey(video.key);
          } else {
            handleSetTVVideo(contentDetails);
            handleSetTVKey(video.key);
          }
        } else {
          if (contentType === "movie") {
            handleSetMovieKey(videoDetails.key);
          } else {
            handleSetTVKey(videoDetails.key);
          }
        }
      } catch (error) {
        console.error("Error while fetching video!", error);
        const video = (
          contentType === "movie" ? FALLBACK_TRAILERS : FALLBACK_TV_TRAILERS
        )[
          Math.floor(
            Math.random() *
              (contentType === "tv"
                ? FALLBACK_TV_TRAILERS.length
                : FALLBACK_TRAILERS.length)
          )
        ];

        const contentDetails = {
          id: video.id,
          poster_path: video.poster_path,
          backdrop_path: null,
          overview: video.overview,
          popularity: 0,
          vote_average: 0,
          title: video.title,
          original_title: video.title,
          name: video.name,
          original_name: video.name,
        };

        if (contentType === "movie") {
          handleSetMovieVideo(contentDetails);
          handleSetMovieKey(video.key);
        } else {
          handleSetTVVideo(contentDetails);
          handleSetTVKey(video.key);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getVideo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || !videoKey) {
    return (
      <div className="relative w-full aspect-video overflow-hidden bg-black">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-black select-none">
      <iframe
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}&modestbranding=1&rel=0&disablekb=1&fs=0&playsinline=1&start=0&end=54&vq=hd1080`}
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent" />

      <motion.div
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
            {(content?.name || content?.title) as string}
          </h2>
          <p className="text-xl text-white/80 text-shadow-lg line-clamp-3">
            {(content?.overview as string) || "the"}
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
      </motion.div>
    </div>
  );
}
