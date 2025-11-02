import { ContentMode, SearchMode } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  searchMode: SearchMode;
  contentMode: ContentMode;
}
const initialState: UIState = {
  searchMode: "ai",
  contentMode: "movie",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setContentMode: (state, action: PayloadAction<UIState["contentMode"]>) => {
      state.contentMode = action.payload;
    },
    setSearchMode: (state, action: PayloadAction<UIState["searchMode"]>) => {
      state.searchMode = action.payload;
    },
  },
});

export const { setContentMode, setSearchMode } = uiSlice.actions;
export default uiSlice.reducer;
