import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoState {
  movie: Record<string, unknown>;
  tv: Record<string, unknown>;
  movieKey: string | null;
  tvKey: string | null;
}

const initialState: VideoState = {
  movie: {},
  tv: {},
  movieKey: null,
  tvKey: null,
};

const videoSlice = createSlice({
  name: "videoData",
  initialState,
  reducers: {
    setMovieVideo: (
      state,
      action: PayloadAction<{ movie: Record<string, unknown> }>
    ) => {
      state.movie = action.payload.movie;
    },
    setTVVideo: (
      state,
      action: PayloadAction<{ tv: Record<string, unknown> }>
    ) => {
      state.tv = action.payload.tv;
    },
    setMovieKey: (state, action: PayloadAction<{ key: string }>) => {
      state.movieKey = action.payload.key;
    },
    setTVKey: (state, action: PayloadAction<{ key: string }>) => {
      state.tvKey = action.payload.key;
    },
  },
});

export const { setMovieVideo, setTVVideo, setMovieKey, setTVKey } =
  videoSlice.actions;
export default videoSlice.reducer;
