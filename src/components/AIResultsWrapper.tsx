import { ai } from "@/lib/ai";
import { buildPrompt } from "@/lib/constants";
import AISearchResults from "./AISearchResults";
import { Suspense } from "react";
import ListSkeleton from "./skeletons/listSkeleton";

export default async function AIResultsWrapper({ query }: { query: string }) {
  let aiData;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: buildPrompt(query),
    });

    if (response?.text) {
      let aiText = response?.text;
      aiText = aiText
        .replace(/^```json\s*/i, "")
        .replace(/^```/, "")
        .replace(/```$/, "")
        .trim();

      if (aiText) {
        aiData = JSON.parse(aiText);
      }
    }
  } catch (error) {
    console.error("Could not parse AI JSON:", error);
  }

  if (!aiData) {
    return (
      <div className="border-b border-foreground/30 border-dashed">
        <div className="max-w-7xl mx-auto border-x py-10 text-center px-4">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2">
            Gemini couldn’t find any matches
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Try rephrasing your search or turning off AI Mode to explore TMDB
            results.
          </p>
          <div className="relative h-10 mt-6 border-t">
            <div className="absolute inset-0 opacity-60 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-full">
      <Suspense fallback={<ListSkeleton />}>
        <AISearchResults contentType="movie" idArray={aiData?.movies} />
      </Suspense>
      <Suspense fallback={<ListSkeleton />}>
        <AISearchResults contentType="tv" idArray={aiData?.tv} />
      </Suspense>
    </div>
  );
}
