import { Languages } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  password: string;
  kidMode: boolean;
  language: Languages;
}

const initialState: UserState = {
  email: "",
  password: "",
  kidMode: false,
  language: "en",
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.kidMode = action.payload.kidMode;
      state.language = action.payload.language;
      state.password = action.payload.password;
    },
    clearUser: (state) => {
      state.email = "";
      state.kidMode = false;
      state.language = "en";
      state.password = "";
    },
    setLanguage: (state, action: PayloadAction<UserState["language"]>) => {
      state.language = action.payload;
    },
    toggleKidMode: (state) => {
      state.kidMode = !state.kidMode;
    },
  },
});

export const { setUser, clearUser, setLanguage, toggleKidMode } =
  userSlice.actions;

export default userSlice.reducer;
