export interface UserData {
  email: string;
  password: string;
  language: Languages;
  kidMode: boolean;
  favourites: {
    movies: [];
    tvSeries: [];
  };
  watchLater: {
    movies: [];
    tvSeries: [];
  };
  // change
  history: Array<{
    id: number;
    type: "movie" | "tv-series";
    details: Record<string, unknown>;
  }>;
}

export type ContentMode = "movie" | "tv-series";
export type Languages = "en" | "hindi";
