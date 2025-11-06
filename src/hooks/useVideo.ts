"use client";
import {
  setMovieKey,
  setMovieVideo,
  setTVKey,
  setTVVideo,
} from "@/store/features/videoSlice";
import { useAppDispatch } from "@/store/hooks";

export default function useVideo() {
  const dispatch = useAppDispatch();

  const handleSetMovieVideo = (movie: Record<string, unknown>) => {
    dispatch(setMovieVideo({ movie }));
  };

  const handleSetTVVideo = (tv: Record<string, unknown>) => {
    dispatch(setTVVideo({ tv }));
  };

  const handleSetMovieKey = (key: string) => {
    dispatch(setMovieKey({ key }));
  };

  const handleSetTVKey = (key: string) => {
    dispatch(setTVKey({ key }));
  };
  return {
    handleSetMovieVideo,
    handleSetTVVideo,
    handleSetTVKey,
    handleSetMovieKey,
  };
}
