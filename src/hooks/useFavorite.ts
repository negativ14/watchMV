"use client";

import {
  addToFavorite,
  removeFromFavroite,
} from "@/store/features/userLibrarySlice";
import { useAppDispatch } from "@/store/hooks";
import { ContentMode } from "@/types/types";
import { toast } from "sonner";

export default function useFavorite() {
  const dispatch = useAppDispatch();

  const handleAddToFavorite = (
    contentType: ContentMode,
    contentDetails: Record<string, unknown>
  ) => {
    dispatch(addToFavorite({ contentType, contentDetails }));
    toast.success("Added to favroites.");
  };

  const handleRemoveFromFavorite = (contentType: ContentMode, id: number) => {
    dispatch(removeFromFavroite({ contentType, id }));
    toast.success("Removed from favroites.");
  };

  return { handleAddToFavorite, handleRemoveFromFavorite };
}
