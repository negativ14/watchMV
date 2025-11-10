import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import uiReducer from "./features/uiSlice";
import libraryReducer from "./features/userLibrarySlice";
import { localStorageMiddleware } from "./middleware/localStorageMiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      userData: userReducer,
      uiData: uiReducer,
      libraryData: libraryReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
