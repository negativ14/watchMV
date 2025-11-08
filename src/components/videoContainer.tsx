import {
  BASE_URL,
  FALLBACK_TRAILERS,
  FALLBACK_TV_TRAILERS,
} from "@/lib/constants";
import React from "react";
import { ContentMode } from "@/types/types";
import VideoFrame from "./VideoFrame";
import fetchCache from "@/lib/fetchCache";

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

export default async function VideoContainer({
  contentType,
}: {
  contentType: ContentMode;
}) {
  let movieKey = null;
  let tvKey = null;
  let movieDetails: TMDBContent | null = null;
  let tvDetails: TMDBContent | null = null;
  const moviesUrl = `h${BASE_URL}/${contentType}/popular?language=en-US`;

  try {
    const dataMovies = await fetchCache(moviesUrl);
    const resultsMovies = dataMovies?.results || [];
    const randomItem =
      resultsMovies[Math.floor(Math.random() * resultsMovies?.length)];
    if (contentType === "movie") {
      movieDetails = randomItem;
    } else {
      tvDetails = randomItem;
    }
    const videoUrl = `h${BASE_URL}/${contentType}/${randomItem?.id}/videos?language=en-US`;

    const dataVideos = await fetchCache(videoUrl);

    const resultVideos = dataVideos?.results || [];
    const filteredTrailer = resultVideos?.filter(
      (item: { type: string }) => item.type === "Trailer"
    );
    const filteredTeaser = resultVideos?.filter(
      (item: { type: string }) => item.type === "Teaser"
    );

    const randomTrailer =
      filteredTrailer[Math.floor(Math.random() * filteredTrailer?.length)];
    const randomTeaser =
      filteredTeaser[Math.floor(Math.random() * filteredTeaser?.length)];
    const currentVideoKey =
      randomTrailer ?? randomTeaser ?? resultVideos[0] ?? null;

    if (!currentVideoKey?.key) {
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
        movieDetails = contentDetails;
        movieKey = video.key;
      } else {
        tvDetails = contentDetails;
        tvKey = video.key;
      }
    } else {
      if (contentType === "movie") {
        movieKey = currentVideoKey?.key;
      } else {
        tvKey = currentVideoKey?.key;
      }
    }
  } catch (error) {
    console.error("Error while fetching video or movies", error);
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
      movieDetails = contentDetails;
      movieKey = video.key;
    } else {
      tvDetails = contentDetails;
      tvKey = video.key;
    }
  }

  const key = contentType === "movie" ? movieKey : tvKey;
  const details = contentType === "movie" ? movieDetails! : tvDetails!;

  return (
    <div>
      <VideoFrame
        videoKey={key}
        contentDetails={details}
        contentType={contentType}
      />
    </div>
  );
}
