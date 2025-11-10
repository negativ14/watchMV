"use client";
import { logout } from "@/lib/validations";
import { setLanguage, toggleKidMode } from "@/store/features/userSlice";
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
import { setContentMode } from "@/store/features/uiSlice";
import { languageConfig } from "@/lib/languages";

export type ItemType = {
  id: string;
  name: string;
  action: () => void;
};
export interface ILanguages {
  id: Languages;
  langugae: string;
}

export const useNavbar = () => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const currentKidMode = useAppSelector((state) => state.userData.kidMode);
  const currentContentMode = useAppSelector(
    (state) => state.uiData.contentMode
  );
  const currentLanguage = useAppSelector((state) => state.userData.language);

  const langugaes: ILanguages[] = [
    {
      id: "en",
      langugae: languageConfig[currentLanguage].navbar.english,
    },
    { id: "hindi", langugae: languageConfig[currentLanguage].navbar.hindi },
  ];

  const handleLogout = () => {
    const res = logout();
    if (res.success) {
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
    toast.success(`Kid Mode turned ${currentKidMode ? "Off" : "On"}`);
  };

  const handleNavigation = (path: string) => {
    push(path);
  };

  const handleToogleMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navUrls = [
    {
      id: "search",
      path:  `/search?query=&adult=${currentKidMode}&aiMode=false&language=${currentLanguage}`,
      name: languageConfig[currentLanguage].navbar.search,
    },
    {
      id: "tv-series",
      path: currentContentMode === "movie" ? "/tv-series" : "/",
      name:
        currentContentMode === "movie"
          ? languageConfig[currentLanguage].navbar.tvSeries
          : languageConfig[currentLanguage].navbar.home,
      onClick: () => {
        dispatch(
          setContentMode(currentContentMode === "movie" ? "tv" : "movie")
        );
      },
    },
  ];

  const mobileOptions = [
    {
      id: "7",
      name:
        currentContentMode === "movie"
          ? languageConfig[currentLanguage].navbar.tvSeries
          : languageConfig[currentLanguage].navbar.home,
      icon: Tv,
      onClick: () =>
        handleNavigation(currentContentMode === "movie" ? "/tv-series" : "/"),
    },
    {
      id: "8",
      name: languageConfig[currentLanguage].navbar.kidMode,
      icon: Baby,
      onClick: handleMobileKidMode,
    },
    {
      id: "1",
      name: languageConfig[currentLanguage].navbar.favorite,
      icon: Heart,
      onClick: () => handleNavigation("/library"),
    },
    {
      id: "2",
      name: languageConfig[currentLanguage].navbar.watchLater,
      icon: Clock,
      onClick: () => handleNavigation("/library#watchLater"),
    },
    {
      id: "3",
      name: languageConfig[currentLanguage].navbar.history,
      icon: History,
      onClick: () => handleNavigation("/library#history"),
    },
    {
      id: "4",
      name: languageConfig[currentLanguage].navbar.language,
      icon: Globe,
      onClick: () => {},
    },
    {
      id: "5",
      name:
        theme === "dark"
          ? languageConfig[currentLanguage].navbar.theme.lightMode
          : languageConfig[currentLanguage].navbar.theme.darkMode,
      icon: theme === "dark" ? Sun : MoonStar,
      onClick: handleToogleMode,
    },
    {
      id: "6",
      name: languageConfig[currentLanguage].navbar.logout,
      icon: LogOut,
      onClick: handleLogout,
    },
  ];

  const tabOptions = [
    {
      id: "1",
      name: languageConfig[currentLanguage].navbar.favorite,
      icon: Heart,
      onClick: () => handleNavigation("/library"),
    },
    {
      id: "2",
      name: languageConfig[currentLanguage].navbar.watchLater,
      icon: Clock,
      onClick: () => handleNavigation("/library#watchLater"),
    },
    {
      id: "3",
      name: languageConfig[currentLanguage].navbar.history,
      icon: History,
      onClick: () => handleNavigation("/library#history"),
    },
    {
      id: "4",
      name: languageConfig[currentLanguage].navbar.language,
      icon: Globe,
      onClick: () => {},
    },
    {
      id: "5",
      name:
        theme === "light"
          ? languageConfig[currentLanguage].navbar.theme.darkMode
          : languageConfig[currentLanguage].navbar.theme.lightMode,
      icon: theme === "light" ? MoonStar : Sun,
      onClick: handleToogleMode,
    },
    {
      id: "6",
      name: languageConfig[currentLanguage].navbar.logout,
      icon: LogOut,
      onClick: handleLogout,
    },
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
    currentLanguage,
    langugaes,
  };
};
