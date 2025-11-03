import { Languages } from "@/types/types";

interface ILanguages {
  id: Languages;
  langugae: string;
}

export const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
export const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export const BaseImageUrl = "https://image.tmdb.org/t/p/w500";

export const langugaes: ILanguages[] = [
  { id: "en", langugae: "English" },
  { id: "hindi", langugae: "Hindi" },
];

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const endpoints = {
  trendingMovies: `${BASE_URL}/trending/movie/day?language=en-US`,
  nowPlayingMovies: `${BASE_URL}/movie/now_playing?language=en-US&page=1`,
  popularMovies: `${BASE_URL}/movie/popular?language=en-US&page=1`,
  topRatedMovies: `${BASE_URL}/movie/top_rated?language=en-US&page=1`,
  upcomingMovies: `${BASE_URL}/movie/upcoming?language=en-US&page=1`,

  trendingTV: `${BASE_URL}/trending/tv/day?language=en-US`,
  airingToday: `${BASE_URL}/tv/airing_today?language=en-US&page=1`,
  onTheAir: `${BASE_URL}/tv/on_the_air?language=en-US&page=1`,
  popularTV: `${BASE_URL}/tv/popular?language=en-US&page=1`,
  topRatedTV: `${BASE_URL}/tv/top_rated?language=en-US&page=1`,
};

export const FALLBACK_TRAILERS = [
  "tgbNymZ7vqY",
  "YoHD9XEInc0",
  "TcMBFSGVi1c",
  "EXeTwQWrcwY",
  "6ZfuNTqbHE8",
];
