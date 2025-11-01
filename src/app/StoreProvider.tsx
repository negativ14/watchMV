"use client";
import { AppStore, makeStore } from "@/store";
import { setUser } from "@/store/features/userSlice";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const userFromStorage = localStorage.getItem("userData");

    if (userFromStorage) {
      try {
        const userData = JSON.parse(userFromStorage);
        storeRef.current?.dispatch(setUser(userData));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
