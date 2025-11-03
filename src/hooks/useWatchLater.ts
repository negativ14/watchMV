import {
  addToWatchLater,
  removeFromWatchLater,
} from "@/store/features/userLibrarySlice";
import { useAppDispatch } from "@/store/hooks";
import { ContentMode } from "@/types/types";
import { toast } from "sonner";

export default function useWatchLater() {
  const dispatch = useAppDispatch();

  const handleAddToWatchLater = ({
    contentType,
    contentDetails,
  }: {
    contentType: ContentMode;
    contentDetails: Record<string, unknown>;
  }) => {
    dispatch(addToWatchLater({ contentType, contentDetails }));
    toast.success("Added to watch later.");
  };

  const handleRemoveFromWatchLater = (contentType: ContentMode, id: number) => {
    dispatch(removeFromWatchLater({ contentType, id }));
    toast.success("Removed from watch later.");
  };

  return { handleAddToWatchLater, handleRemoveFromWatchLater };
}
