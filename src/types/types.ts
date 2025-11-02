export interface UserData {
  email: string;
  password: string;
  language: Languages;
  kidMode: boolean;
  favorites: {
    movies: Record<string, unknown>[];
    tv: Record<string, unknown>[];
  };
  watchLater: {
    movies: Record<string, unknown>[];
    tv: Record<string, unknown>[];
  };
  watchHistory: Array<{
    contentType: ContentMode;
    contentDetails: Record<string, unknown>;
  }>;
  searchHistory: string[];
}

export type SearchMode = "ai" | "normal";
export type ContentMode = "movie" | "tv";
export type Languages = "en" | "hindi";
