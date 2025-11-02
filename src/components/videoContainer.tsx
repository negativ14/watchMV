"use client";
import { options } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function VideoContainer({
  contentType,
}: {
  contentType: string;
}) {
  const [videoId, setVideoId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const movieId = 502356;
  const url = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieId}/videos?language=en-US`;


  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, options);
        const data = await response.json();
        setVideoId(data.results[0].key);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideoDetails();
  }, [url]);

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
      <div className="absolute bg-red-300"></div>
    </div>
  );
}
