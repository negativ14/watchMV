"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function SearchBar({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState<string>(initialQuery);
  const [aiMode, setAIMode] = useState<boolean>(false);
  const { push } = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };
  return (
    <div className="border-b border-dashed border-foreground/30">
      <div className="flex flex-col md:flex-row item-center gap-4 max-w-7xl mx-auto w-full p-4 border-x">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4 w-full"
        >
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search anything...."
            className="w-full flex-1"
          />
          <Button className="cursor-pointer" type="submit">
            Search
          </Button>
        </form>

        <div className="relative overflow-hidden bg-white p-px rounded-lg flex-shrink-0 z-10">
          <div className="absolute h-full w-full [background-image:conic-gradient(at_center,transparent,var(--color-blue-500)_20%,transparent_30)] animate-spin" />
          <button
            onClick={() => setAIMode(!aiMode)}
            className={cn(
              "text-sm px-4 bg-secondary text-violet-100 rounded-md whitespace-nowrap cursor-pointer hover:opacity-90 w-full md:w-fit py-2.5",
              aiMode && "bg-gradient-to-br from-indigo-500 to-violet-600",
              "transition-all duration-300 ease-in-out"
            )}
          >
            {aiMode ? "AI Mode On" : "Use AI Mode"}
          </button>
        </div>
      </div>
    </div>
  );
}
