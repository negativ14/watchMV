"use client";
import { logout } from "@/lib/validations";
import {
  clearUser,
  setLanguage,
  toggleKidMode,
} from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Languages } from "@/types/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Heart,
  Clock,
  History,
  Globe,
  LogOut,
  Tv,
  Sun,
  Baby,
  MoonStar,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export type ItemType = {
  id: string;
  name: string;
  action: () => void;
};

export const useNavbar = () => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const currentKidMode = useAppSelector(state => state.userData.kidMode)

  const handleLogout = () => {
    const res = logout();
    if (res.success) {
      dispatch(clearUser());
      push("/auth");
      toast.success("Logged out successfully");
    }
  };

  const handleLanguage = (language: Languages) => {
    dispatch(setLanguage(language));
  };

  const handleKidMode = () => {
    setModalOpen(true);
  };

  const handleMobileKidMode = () => {
    dispatch(toggleKidMode());
    toast.success(`Kid Mode turned ${currentKidMode ? "Off" : "On"}`)
  };

  const handleNavigation = (path: string) => {
    push(path);
  };

  const handleToogleMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navUrls = [
    { id: "search", path: "/search", name: "Search" },
    { id: "tv-series", path: "/tv-series", name: "TV Series" },
  ];

  const mobileOptions = [
    {
      id: "7",
      name: "TV Series",
      icon: Tv,
      onClick: () => handleNavigation("/tv-series"),
    },
    { id: "8", name: "Kid Mode", icon: Baby, onClick: handleMobileKidMode },
    {
      id: "1",
      name: "Favorites",
      icon: Heart,
      onClick: () => handleNavigation("/library"),
    },
    {
      id: "2",
      name: "Watch Later",
      icon: Clock,
      onClick: () => handleNavigation("/library"),
    },
    {
      id: "3",
      name: "History",
      icon: History,
      onClick: () => handleNavigation("/library"),
    },
    {
      id: "4",
      name: "Language",
      icon: Globe,
      onClick: () => {},
    },
    {
      id: "5",
      name: theme === "dark" ? "Light mode" : "Dark mode",
      icon: theme === "dark" ? Sun : MoonStar,
      onClick: handleToogleMode,
    },
    { id: "6", name: "Logout", icon: LogOut, onClick: handleLogout },
  ];

  const tabOptions = [
    {
      id: "1",
      name: "Favorites",
      icon: Heart,
      onClick: () => handleNavigation("/library"),
    },
    {
      id: "2",
      name: "Watch Later",
      icon: Clock,
      onClick: () => handleNavigation("/library"),
    },
    {
      id: "3",
      name: "History",
      icon: History,
      onClick: () => handleNavigation("/library"),
    },
    {
      id: "4",
      name: "Language",
      icon: Globe,
      onClick: () => {},
    },
    {
      id: "5",
      name: theme === "light" ? "dark" : "light",
      icon: theme === "light" ? MoonStar : Sun,
      onClick: handleToogleMode,
    },
    { id: "6", name: "Logout", icon: LogOut, onClick: handleLogout },
  ];

  return {
    mobileOptions,
    navUrls,
    handleLogout,
    handleKidMode,
    handleLanguage,
    handleNavigation,
    tabOptions,
    isModalOpen,
    setModalOpen,
    currentKidMode,
  };
};
