import { Middleware } from "@reduxjs/toolkit";
import { UserData } from "@/types/types";

export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    // After state updates, save to localStorage
    try {
      const state = store.getState();

      const userData: UserData = {
        email: state.userData.email,
        password: state.userData.password,
        language: state.userData.language,
        kidMode: state.userData.kidMode,
        favorites: state.libraryData.favorites,
        watchLater: state.libraryData.watchLater,
        watchHistory: state.libraryData.watchHistory,
        searchHistory: state.libraryData.searchHistory,
      };

      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }

    return result;
  };
