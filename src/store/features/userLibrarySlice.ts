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
        state.favorites.movies.unshift(action.payload.contentDetails);
      } else {
        state.favorites.tv.unshift(action.payload.contentDetails);
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
        state.watchLater.movies.unshift(action.payload.contentDetails);
      } else {
        state.watchLater.tv.unshift(action.payload.contentDetails);
      }
    },
    addToWatchHistory: (
      state,
      action: PayloadAction<{
        contentType: ContentMode;
        contentDetails: Record<string, unknown>;
      }>
    ) => {
      state.watchHistory.unshift(action.payload);
    },
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      state.searchHitory.unshift(action.payload);
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
} = librarySlice.actions;
export default librarySlice.reducer;
