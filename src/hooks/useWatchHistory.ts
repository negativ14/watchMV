import { languageConfig } from "@/lib/languages";
import {
  addToWatchHistory,
  clearWatchHistory,
  removeFromWatchHistory,
} from "@/store/features/userLibrarySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ContentMode } from "@/types/types";
import { toast } from "sonner";

export default function useWatchHistory() {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector((state) => state.userData.language);

  const handleAddToWatchHistory = ({
    contentType,
    contentDetails,
  }: {
    contentType: ContentMode;
    contentDetails: Record<string, unknown>;
  }) => {
    dispatch(addToWatchHistory({ contentType, contentDetails }));
  };

  const handleRemoveFromWatchHistory = (id: number) => {
    dispatch(removeFromWatchHistory({ id }));
    toast.success(languageConfig[currentLanguage].toast.watchHistory.removed);
  };

  const handleClearWatchHistory = () => {
    dispatch(clearWatchHistory());
    toast.success(languageConfig[currentLanguage].toast.watchHistory.cleared);
  };

  return {
    handleAddToWatchHistory,
    handleRemoveFromWatchHistory,
    handleClearWatchHistory,
  };
}
