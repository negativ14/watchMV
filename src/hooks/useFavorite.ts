"use client";

import { languageConfig } from "@/lib/languages";
import {
  addToFavorite,
  removeFromFavorite,
} from "@/store/features/userLibrarySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ContentMode } from "@/types/types";
import { toast } from "sonner";

export default function useFavorite() {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector((state) => state.userData.language);

  const handleAddToFavorite = (
    contentType: ContentMode,
    contentDetails: Record<string, unknown>
  ) => {
    dispatch(addToFavorite({ contentType, contentDetails }));
    toast.success(languageConfig[currentLanguage].toast.favorite.added);
  };

  const handleRemoveFromFavorite = (contentType: ContentMode, id: number) => {
    dispatch(removeFromFavorite({ contentType, id }));
    toast.success(languageConfig[currentLanguage].toast.favorite.removed);
  };

  return { handleAddToFavorite, handleRemoveFromFavorite };
}
