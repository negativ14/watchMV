"use client";
import { languageConfig } from "@/lib/languages";
import {
  addToSearchHistory,
  clearSearchHistory,
  removeFromSearchHistory,
} from "@/store/features/userLibrarySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "sonner";

export default function useSearchHistory() {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector((state) => state.userData.language);

  const handleAddToSearchHistory = (text: string) => {
    dispatch(addToSearchHistory(text));
  };

  const handleRemoveFromSearchHistory = (index: number) => {
    dispatch(removeFromSearchHistory({ index }));
    toast.success(languageConfig[currentLanguage].toast.searchHistory.removed);
  };

  const handleClearSearchHistory = () => {
    dispatch(clearSearchHistory());
    toast.success(languageConfig[currentLanguage].toast.searchHistory.cleared);
  };

  return {
    handleAddToSearchHistory,
    handleRemoveFromSearchHistory,
    handleClearSearchHistory,
  };
}
