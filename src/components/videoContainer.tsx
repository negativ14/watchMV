"use client";
import { BASE_URL, FALLBACK_TRAILERS, options } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { ContentMode } from "@/types/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

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
  const [videoId, setVideoId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contentDetail, setContentDetail] = useState<TMDBContent | null>(null);

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
    const getVideo = async () => {
      try {
        setIsLoading(true);
        const contentDetails = await fetchContent();
        setContentDetail(contentDetails);
        const videoDetails = await fetchVideoDetails(contentDetails.id);
        if (!videoDetails?.key) {
          const key =
            FALLBACK_TRAILERS[
              Math.floor(Math.random() * FALLBACK_TRAILERS.length)
            ];
          setVideoId(key);
        } else {
          setVideoId(videoDetails.key);
        }
      } catch (error) {
        console.error("Error while fetching video!", error);
      } finally {
        setIsLoading(false);
      }
    };
    getVideo();
  }, [contentType]);

  if (isLoading || !videoId) {
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
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&disablekb=1&fs=0&playsinline=1&start=0&end=54&vq=hd1080`}
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent" />

      {/* movie video details */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute max-w-lg bottom-0 -translate-y-11/12 left-5 hidden md:flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-4xl text-white text-shadow-lg">
            {contentDetail?.original_name || contentDetail?.original_title}
          </h2>
          <p className="text-xl text-white/80 text-shadow-lg line-clamp-3">
            {contentDetail?.overview || "the"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            className={cn(
              "text-white text-xl rounded-md font-medium hover:opacity-90 cursor-pointer px-4 py-1.5",
              contentType === "movie"
                ? "bg-gradient-to-br from-movie-primary to-sky-600"
                : "bg-gradient-to-br from-tv-primary to-sky-600"
            )}
          >
            Play now
          </button>
          <button className="text-white text-xl rounded-md font-medium hover:bg-white/30 cursor-pointer px-4 py-1.5">
            watch later
          </button>
        </div>
      </motion.div>
    </div>
  );
}
