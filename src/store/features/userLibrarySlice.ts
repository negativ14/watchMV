import { ContentMode } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LibraryState {
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

export const initialState: LibraryState = {
  favorites: { movies: [], tv: [] },
  watchLater: { movies: [], tv: [] },
  watchHistory: [],
  searchHistory: [],
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addToFavorite: (
      state,
      action: PayloadAction<{
        contentType: ContentMode;
        contentDetails: Record<string, unknown>;
      }>
    ) => {
      const { contentType, contentDetails } = action.payload;

      if (contentType === "movie") {
        const alreadyExists = state.favorites.movies.some(
          (item) => Number(item.id) === Number(contentDetails.id)
        );
        if (!alreadyExists) {
          state.favorites.movies = [contentDetails, ...state.favorites.movies];
        }
      } else {
        const alreadyExists = state.favorites.tv.some(
          (item) => Number(item.id) === Number(contentDetails.id)
        );
        if (!alreadyExists) {
          state.favorites.tv = [contentDetails, ...state.favorites.tv];
        }
      }
    },

    removeFromFavorite: (
      state,
      action: PayloadAction<{ contentType: ContentMode; id: number }>
    ) => {
      if (action.payload.contentType === "movie") {
        const newFavoritesMovies = state.favorites.movies.filter(
          (item) => Number(item.id) !== Number(action.payload.id)
        );
        state.favorites.movies = newFavoritesMovies;
      } else {
        const newFavoritesTV = state.favorites.tv.filter(
          (item) => Number(item.id) !== Number(action.payload.id)
        );
        state.favorites.tv = newFavoritesTV;
      }
    },
    addToWatchLater: (
      state,
      action: PayloadAction<{
        contentType: ContentMode;
        contentDetails: Record<string, unknown>;
      }>
    ) => {
      if (action.payload.contentType === "movie") {
        const existAlready = state.watchLater.movies.some(
          (item) => Number(item.id) === Number(action.payload.contentDetails.id)
        );
        if (!existAlready)
          state.watchLater.movies = [
            action.payload.contentDetails,
            ...state.watchLater.movies,
          ];
      } else {
        const existAlready = state.watchLater.tv.some(
          (item) => Number(item.id) === Number(action.payload.contentDetails.id)
        );
        if (!existAlready)
          state.watchLater.tv = [
            action.payload.contentDetails,
            ...state.watchLater.tv,
          ];
      }
    },
    removeFromWatchLater: (
      state,
      action: PayloadAction<{ contentType: ContentMode; id: number }>
    ) => {
      if (action.payload.contentType === "movie") {
        const newWatchLater = state.watchLater.movies.filter(
          (item) => Number(item.id) !== Number(action.payload.id)
        );
        state.watchLater.movies = newWatchLater;
      } else {
        const newWatchLaterTV = state.watchLater.tv.filter(
          (item) => Number(item.id) !== Number(action.payload.id)
        );
        state.watchLater.tv = newWatchLaterTV;
      }
    },
    addToWatchHistory: (
      state,
      action: PayloadAction<{
        contentType: ContentMode;
        contentDetails: Record<string, unknown>;
      }>
    ) => {
      const existAlready = state.watchHistory.some(
        (item) =>
          Number(item.contentDetails.id) ===
          Number(action.payload.contentDetails.id)
      );
      if (existAlready) {
        const newFilteredHistory = state.watchHistory.filter(
          (item) =>
            Number(item.contentDetails.id) !==
            Number(action.payload.contentDetails.id)
        );
        newFilteredHistory.unshift(action.payload);
        state.watchHistory = newFilteredHistory;
      } else {
        state.watchHistory = [action.payload, ...state.watchHistory];
      }
    },
    removeFromWatchHistory: (state, action: PayloadAction<{ id: number }>) => {
      const newWatchHistory = state.watchHistory.filter(
        (item) => Number(item.contentDetails.id) !== Number(action.payload.id)
      );

      state.watchHistory = newWatchHistory;
    },
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      if (action.payload.trim()) {
        const doesExist = state.searchHistory.some(
          (item) => item === action.payload
        );
        if (doesExist) {
          const newHistory = state.searchHistory.filter(
            (item) => item !== action.payload
          );
          state.searchHistory = [action.payload, ...newHistory];
        } else {
          state.searchHistory = [action.payload, ...state.searchHistory];
        }
      }

      if (state.searchHistory.length > 10) {
        state.searchHistory = state.searchHistory.slice(0, 10);
      }
    },
    removeFromSearchHistory: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      const newHistory = state.searchHistory.filter(
        (item, index) => index !== action.payload.index
      );
      state.searchHistory = newHistory;
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    setFavorites: (
      state,
      action: PayloadAction<{
        movies: Record<string, unknown>[];
        tv: Record<string, unknown>[];
      }>
    ) => {
      state.favorites = action.payload;
    },
    setWatchLater: (
      state,
      action: PayloadAction<{
        movies: Record<string, unknown>[];
        tv: Record<string, unknown>[];
      }>
    ) => {
      state.watchLater = action.payload;
    },
    setWatchHistory: (
      state,
      action: PayloadAction<
        Array<{
          contentType: ContentMode;
          contentDetails: Record<string, unknown>;
        }>
      >
    ) => {
      state.watchHistory = action.payload;
    },
    clearWatchHistory: (state) => {
      state.watchHistory = [];
    },
    setSearchHistory: (state, action: PayloadAction<string[] | undefined>) => {
      state.searchHistory = Array.isArray(action.payload) ? action.payload : [];
    },
  },
});

export const {
  addToFavorite,
  addToSearchHistory,
  addToWatchHistory,
  addToWatchLater,
  setFavorites,
  setWatchLater,
  setWatchHistory,
  setSearchHistory,
  removeFromFavorite,
  removeFromSearchHistory,
  removeFromWatchHistory,
  removeFromWatchLater,
  clearWatchHistory,
  clearSearchHistory,
} = librarySlice.actions;
export default librarySlice.reducer;
