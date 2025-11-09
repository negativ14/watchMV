"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { toast } from "sonner";

export default function SearchBar({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState<string>(initialQuery);
  const [aiMode, setAIMode] = useState<boolean>(false);
  const { push } = useRouter();
  const adult = useAppSelector((state) => state.userData.kidMode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      push(
        `/search?query=${encodeURIComponent(
          query.trim()
        )}&adult=${adult}&aiMode=${aiMode}`
      );
    }
  };

  const hanldeAIMode = () => {
    if (aiMode) {
      setAIMode(false);
      toast.success("AI Mode turned off!");
    } else {
      setAIMode(true);
      toast.success("AI Mode turned on.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="border-b border-dashed border-foreground/30">
      <div className="flex flex-col md:flex-row item-center gap-4 max-w-7xl mx-auto w-full p-4 border-x">
        <form
          role="search"
          aria-label="Site search"
          onSubmit={handleSubmit}
          className="flex items-center gap-4 w-full"
        >
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="search anything...."
            className="w-full flex-1"
            aria-label="Search input"
            autoFocus
          />
          <Button
            aria-label="Submit search"
            className="cursor-pointer"
            type="submit"
          >
            Search
          </Button>
        </form>

        <div className="relative overflow-hidden bg-white p-[2px] rounded-lg flex-shrink-0 z-10">
          <div className="absolute inset-0 flex items-center justify-center">
            {!aiMode && (
              <div className="h-[150%] w-[150%] rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(79,70,229,0.8)_25%,transparent_50%,rgba(147,51,234,0.8)_75%,transparent)] animate-spin" />
            )}
          </div>

          <button
            aria-label="Toggle AI mode"
            onClick={hanldeAIMode}
            className={cn(
              "relative z-10 text-sm px-4 py-2.5 rounded-md whitespace-nowrap cursor-pointer transition-all duration-300 ease-in-out w-full md:w-fit text-violet-100",
              aiMode
                ? "bg-gradient-to-br from-indigo-500 to-violet-600"
                : "bg-secondary hover:opacity-90"
            )}
          >
            {aiMode ? "AI Mode On" : "Turn On AI Mode"}
          </button>
        </div>
      </div>
    </div>
  );
}
