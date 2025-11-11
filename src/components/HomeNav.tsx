"use client";
import { languageConfig } from "@/lib/languages";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomeNav() {
  const currentLanguage = useAppSelector((state) => state.userData.language);
  const { back } = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className="border-b border-dashed border-foreground/30">
      <div className="h-20 border-x max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-shadow-md no-select px-4">
          watch<span className="text-movie-primary">M</span>
          <span className="text-tv-primary">V</span>
        </h1>

        <button
          onClick={() => back()}
          className="relative group mr-4 cursor-pointer"
        >
          {languageConfig[currentLanguage].navbar.home}
          <span className="absolute bottom-0 left-0 bg-foreground h-px w-full rounded-sm origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
