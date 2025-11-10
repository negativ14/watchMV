import { languageConfig } from "@/lib/languages";
import {
  addToWatchLater,
  removeFromWatchLater,
} from "@/store/features/userLibrarySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ContentMode } from "@/types/types";
import { toast } from "sonner";

export default function useWatchLater() {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector((state) => state.userData.language);

  const handleAddToWatchLater = ({
    contentType,
    contentDetails,
  }: {
    contentType: ContentMode;
    contentDetails: Record<string, unknown>;
  }) => {
    dispatch(addToWatchLater({ contentType, contentDetails }));
    toast.success(languageConfig[currentLanguage].toast.watchLater.added);
  };

  const handleRemoveFromWatchLater = (contentType: ContentMode, id: number) => {
    dispatch(removeFromWatchLater({ contentType, id }));
    toast.success(languageConfig[currentLanguage].toast.watchLater.removed);
  };

  return { handleAddToWatchLater, handleRemoveFromWatchLater };
}
