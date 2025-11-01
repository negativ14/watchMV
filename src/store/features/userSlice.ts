import { UserData } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: UserData | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setLanguage: (state, action: PayloadAction<UserData["language"]>) => {
      if (state.user) state.user.language = action.payload;
    },
    toggleKidMode: (state) => {
      if (state.user) state.user.kidMode = !state.user.kidMode;
    },
  },
});

export const { setUser, clearUser, setLanguage, toggleKidMode } =
  userSlice.actions;

export default userSlice.reducer;
