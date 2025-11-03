"use client";
import {
  addToSearchHistory,
  removeFromSearchHistory,
} from "@/store/features/userLibrarySlice";
import { useAppDispatch } from "@/store/hooks";

export default function useSearchHistory() {
  const dispatch = useAppDispatch();

  const handleAddToSearchHistory = (text: string) => {
    dispatch(addToSearchHistory(text));
  };

  const handleRemoveFromSearchHistory = (index: number) => {
    dispatch(removeFromSearchHistory({ index }));
  };

  return { handleAddToSearchHistory, handleRemoveFromSearchHistory };
}
