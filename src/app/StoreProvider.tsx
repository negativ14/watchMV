"use client";
import { AppStore, makeStore } from "@/store";
import { setUser } from "@/store/features/userSlice";
import {
  setFavorites,
  setWatchLater,
  setWatchHistory,
  setSearchHistory,
} from "@/store/features/userLibrarySlice";
import { useRef } from "react";
import { Provider } from "react-redux";
import { UserData } from "@/types/types";

const loadUserDataFromStorage = (): UserData | undefined => {
  if (typeof window === "undefined") return undefined; 

  try {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      return JSON.parse(userDataString) as UserData;
    }
  } catch (error) {
    console.error("Failed to parse userData from localStorage:", error);
    localStorage.removeItem("userData");
  }
  return undefined;
};

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();

    const savedUserData = loadUserDataFromStorage();
    
    if (savedUserData) {
      storeRef.current.dispatch(
        setUser({
          email: savedUserData.email,
          password: savedUserData.password,
          language: savedUserData.language,
          kidMode: savedUserData.kidMode,
        })
      );

      storeRef.current.dispatch(setFavorites(savedUserData.favorites));
      storeRef.current.dispatch(setWatchLater(savedUserData.watchLater));
      storeRef.current.dispatch(setWatchHistory(savedUserData.watchHistory));
      storeRef.current.dispatch(setSearchHistory(savedUserData.searchHistory));
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}