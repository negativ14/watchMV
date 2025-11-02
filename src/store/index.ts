import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import uiReducer from "./features/uiSlice";
import libraryReducer from "./features/userLibrarySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      userData: userReducer,
      uiData: uiReducer,
      libraryData: libraryReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
