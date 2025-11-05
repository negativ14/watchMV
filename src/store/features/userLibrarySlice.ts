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
  searchHitory: string[];
}

const initialState: LibraryState = {
  favorites: { movies: [], tv: [] },
  watchLater: { movies: [], tv: [] },
  watchHistory: [],
  searchHitory: [],
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
      if (action.payload.contentType === "movie") {
        const existAlready = state.favorites.movies.some(
          (item) => item.id === action.payload.contentDetails.id
        );
        if (!existAlready)
          state.favorites.movies.unshift(action.payload.contentDetails);
      } else {
        const existAlready = state.favorites.tv.some(
          (item) => item.id === action.payload.contentDetails.id
        );
        if (!existAlready)
          state.favorites.tv.unshift(action.payload.contentDetails);
      }
    },
    removeFromFavroite: (
      state,
      action: PayloadAction<{ contentType: ContentMode; id: number }>
    ) => {
      if (action.payload.contentType === "movie") {
        const newFavoritesMovies = state.favorites.movies.filter(
          (item) => item.id !== action.payload.id
        );
        state.favorites.movies = newFavoritesMovies;
      } else {
        const newFavoritesTV = state.favorites.tv.filter(
          (item) => item.id !== action.payload.id
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
          (item) => item.id === action.payload.contentDetails.id
        );
        if (!existAlready)
          state.watchLater.movies.unshift(action.payload.contentDetails);
      } else {
        const existAlready = state.watchLater.tv.some(
          (item) => item.id === action.payload.contentDetails.id
        );
        if (!existAlready)
          state.watchLater.tv.unshift(action.payload.contentDetails);
      }
    },
    removeFromWatchLater: (
      state,
      action: PayloadAction<{ contentType: ContentMode; id: number }>
    ) => {
      if (action.payload.contentType === "movie") {
        const newWatchLater = state.watchLater.movies.filter(
          (item) => item.id !== action.payload.id
        );
        state.watchLater.movies = newWatchLater;
      } else {
        const newWatchLaterTV = state.watchLater.tv.filter(
          (item) => item.id !== action.payload.id
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
        (item) => item.contentDetails.id === action.payload.contentDetails.id
      );
      if (existAlready) {
        const newFilteredHistory = state.watchHistory.filter(
          (item) => item.contentDetails.id !== action.payload.contentDetails.id
        );
        newFilteredHistory.unshift(action.payload);
        state.watchHistory = newFilteredHistory;
      } else {
        state.watchHistory.unshift(action.payload);
      }
    },
    removeFromWatchHistory: (state, action: PayloadAction<{ id: number }>) => {
      const newWatchHistory = state.watchHistory.filter(
        (item) => item.contentDetails.id !== action.payload.id
      );

      state.watchHistory = newWatchHistory;
    },
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      state.searchHitory.unshift(action.payload);
    },
    removeFromSearchHistory: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      const newHistory = state.searchHitory.filter(
        (item, index) => index !== action.payload.index
      );
      state.searchHitory = newHistory;
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
    setSearchHistory: (state, action: PayloadAction<string[]>) => {
      state.searchHitory = action.payload;
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
  removeFromFavroite,
  removeFromSearchHistory,
  removeFromWatchHistory,
  removeFromWatchLater,
  clearWatchHistory,
} = librarySlice.actions;
export default librarySlice.reducer;
