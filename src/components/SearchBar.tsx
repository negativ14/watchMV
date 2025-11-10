"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import { languageConfig } from "@/lib/languages";
import { History, Trash2 } from "lucide-react";
import useSearchHistory from "@/hooks/useSearchHistory";

export default function SearchBar({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState<string>(initialQuery);
  const [aiMode, setAIMode] = useState<boolean>(false);
  const { push, refresh } = useRouter();
  const adult = useAppSelector((state) => state.userData.kidMode);
  const currentLanguage = useAppSelector((state) => state.userData.language);
  const [mounted, setMounted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchHistory = useAppSelector(
    (state) => state.libraryData.searchHistory
  );
  const {
    handleAddToSearchHistory,
    handleClearSearchHistory,
    handleRemoveFromSearchHistory,
  } = useSearchHistory();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddToSearchHistory(query);
    if (query.trim()) {
      push(
        `/search?query=${encodeURIComponent(
          query.trim()
        )}&adult=${adult}&aiMode=${aiMode}&language=${currentLanguage}`
      );
      refresh();
    }
  };

  const hanldeAIMode = () => {
    if (aiMode) {
      setAIMode(false);
      toast.success(languageConfig[currentLanguage].searchBar.toastOff);
    } else {
      setAIMode(true);
      toast.success(languageConfig[currentLanguage].searchBar.toastOn);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  if (!mounted) return null;

  return (
    <div className="border-b border-dashed border-foreground/30">
      <div className="flex flex-col md:flex-row item-center gap-4 max-w-7xl mx-auto w-full p-4 border-x">
        <form
          role="search"
          aria-label="Site search"
          onSubmit={handleSubmit}
          className="flex items-center gap-4 w-full relative"
        >
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowHistory(true)}
            placeholder={
              currentLanguage === "en"
                ? languageConfig[currentLanguage].searchBar.placeholder
                : languageConfig[currentLanguage].searchBar.placeholder
            }
            className="w-full flex-1"
            aria-label="Search input"
          ></Input>
          {showHistory && searchHistory?.length > 0 && (
            <div
              className="absolute top-12 pr-1 z-0 w-11/12"
              ref={containerRef}
            >
              <div className="bg-secondary border-px hover:bg-muted rounded-md divide-y px-4">
                {searchHistory?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group py-2.5 overflow-hidden"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <History className="size-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground group-hover:text-foreground text-sm whitespace-nowrap truncate flex-1 cursor-pointer">
                        {item}{" "}
                      </span>
                    </div>
                    <Trash2
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromSearchHistory(index);
                      }}
                      className="size-4 text-destructive/70 group-hover:text-destructive flex-shrink-0 cursor-pointer"
                    />
                  </div>
                ))}

                <h2
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearSearchHistory();
                  }}
                  className="flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer py-2 gap-1 tracking-tighter group"
                >
                  <span>Clear History</span>{" "}
                  <Trash2 className="size-3.5 text-destructive/70 group-hover:text-destructive flex-shrink-0" />
                </h2>
              </div>
            </div>
          )}
          <Button
            aria-label="Submit search"
            className="cursor-pointer"
            type="submit"
          >
            {languageConfig[currentLanguage].searchBar.search}
          </Button>
        </form>

        <div className="relative overflow-hidden bg-neutral-200 dark:bg-white p-[2px] rounded-lg flex-shrink-0 z-10">
          <div className="absolute inset-0 flex items-center justify-center">
            {!aiMode && (
              <div className="h-[150%] w-[150%] rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(79,70,229,0.8)_25%,transparent_50%,rgba(147,51,234,0.8)_75%,transparent)] animate-spin" />
            )}
          </div>

          <button
            aria-label="Toggle AI mode"
            onClick={hanldeAIMode}
            className={cn(
              "relative z-10 text-sm px-4 py-2.5 rounded-md whitespace-nowrap cursor-pointer transition-all duration-300 ease-in-out w-full md:w-fit text-black dark:text-violet-100",
              aiMode
                ? "bg-gradient-to-br from-indigo-500 to-violet-600"
                : "bg-muted hover:opacity-90"
            )}
          >
            {aiMode
              ? languageConfig[currentLanguage].searchBar.AIModeOn
              : languageConfig[currentLanguage].searchBar.TurnOnAIMode}
          </button>
        </div>
      </div>
    </div>
  );
}
