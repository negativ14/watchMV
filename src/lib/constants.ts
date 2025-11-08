import { Languages } from "@/types/types";

interface ILanguages {
  id: Languages;
  langugae: string;
}

export const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
export const API_KEY = process.env.TMDB_API_KEY;
export const Image_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const Provider_Base_URL = "https://image.tmdb.org/t/p/w185";

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
  {
    id: 27205,
    key: "hstBN0Qkqhc",
    title: "Inception",
    name: "Inception",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology is given a chance to erase his past by planting an idea into someone's subconscious.",
    poster_path: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
  },
  {
    id: 157336,
    key: "zSWdZVtXT7E",
    title: "Interstellar",
    name: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 299534,
    key: "TcMBFSGVi1c",
    title: "Avengers: Endgame",
    name: "Avengers: Endgame",
    overview:
      "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
  {
    id: 155,
    key: "abER52pzkG0",
    title: "The Dark Knight",
    name: "The Dark Knight",
    overview:
      "Batman sets out to dismantle the remaining criminal organizations that plague Gotham, but soon finds himself prey to the Joker's chaos.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 299536,
    key: "6ZfuNTqbHE8",
    title: "Avengers: Infinity War",
    name: "Avengers: Infinity War",
    overview:
      "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat Thanos before his blitz of devastation puts an end to the universe.",
    poster_path: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
];

export const FALLBACK_TV_TRAILERS = [
  {
    id: 1399,
    key: "1JLUn2DFW4w",
    title: "Breaking Bad",
    name: "Breaking Bad",
    overview:
      "A struggling high school chemistry teacher, Walter White, is diagnosed with inoperable lung cancer and turns to manufacturing and selling methamphetamine with his former student, Jesse Pinkman, to secure his family's financial future.",
    poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
  },
  {
    id: 66732,
    key: "b9EkMc79ZSU",
    title: "Stranger Things",
    name: "Stranger Things",
    overview:
      "Set in the 1980s, the series centers on the residents of the fictional small town of Hawkins, Indiana, after a young girl with psychokinetic abilities opens a gateway between Earth and a hostile alternate dimension known as the Upside Down.",
    poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
  },
  {
    id: 76479,
    key: "5SKP1_F7ReE",
    title: "The Boys",
    name: "The Boys",
    overview:
      "The eponymous team of vigilantes combat superpowered individuals (referred to as 'Supes') who abuse their powers for personal gain and work for a powerful, corrupt corporation (Vought International).",
    poster_path: "/mGVrXeIjyecj6TKmwPVpHlscEmw.jpg",
  },
  {
    id: 1399,
    key: "KPLWWIOCOOQ",
    title: "Game of Thrones",
    name: "Game of Thrones",
    overview:
      "Set on the continents of Westeros and Essos, the series chronicles the power struggles among noble families as they fight for control of the Iron Throne of the Seven Kingdoms, while a supernatural threat looms in the North.",
    poster_path: "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
  },
  {
    id: 71912,
    key: "ndl1W4ltcmg",
    title: "The Witcher",
    name: "The Witcher",
    overview:
      "Geralt of Rivia, a solitary monster hunter (a 'witcher') with superhuman abilities, navigates a medieval-inspired world where humans are often more wicked than the beasts he's hired to slay.",
    poster_path: "/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg",
  },
];
