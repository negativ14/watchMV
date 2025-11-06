import {
  addToWatchHistory,
  clearWatchHistory,
  removeFromWatchHistory,
} from "@/store/features/userLibrarySlice";
import { useAppDispatch } from "@/store/hooks";
import { ContentMode } from "@/types/types";

export default function useWatchHistory() {
  const dispatch = useAppDispatch();

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
  };

  const handleClearWatchHistory = () => {
    dispatch(clearWatchHistory());
  };

  return {
    handleAddToWatchHistory,
    handleRemoveFromWatchHistory,
    handleClearWatchHistory,
  };
}
