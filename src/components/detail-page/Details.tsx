"use client";

import { Bookmark, Heart } from "lucide-react";
import { IContentDetails } from "./ContentDetails";
import { Badge } from "../ui/badge";
import BasicCards from "../BasicCards";
import { ContentMode } from "@/types/types";

export default function Details({
  content,
  contentType,
  id,
}: {
  content: IContentDetails;
  contentType: ContentMode;
  id: number;
}) {
  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex items-center justify-between divide-x px-4 py-1 border-b">
        <h1 className="text-xl md:text-3xl text-muted-foreground font-semibold whitespace-nowrap truncate overflow-hidden tracking-tighter">
          Title:{" "}
          <span className="text-foreground md:text-4xl text-2xl">
            {content.name || content.title}
          </span>
        </h1>
        <div className="flex items-center gap-4 opacity-90">
          <Badge variant={"default"}>{content.status}</Badge>
          <Heart className="size-6" />
          <Bookmark className="size-6" />
        </div>
      </div>

      <div className="px-4 py-1 flex flex-col gap-1">
        <h2 className="text-lg font-medium text-muted-foreground">Overview:</h2>
        <p className="text-xl text-foreground tracking-tight">
          {content.overview}
        </p>
      </div>

      <h2 className="flex items-baseline gap-2 px-4 py-1 text-lg text-muted-foreground">
        Release Date:{" "}
        <p className="text-xl text-foreground tracking-tight">
          {content.release_date || content.first_air_date}
        </p>
      </h2>

      <h2 className="flex items-center gap-2 text-muted-foreground text-lg px-4 py-1">
        Ratings:{" "}
        <p className="text-foreground text-xl tracking-tight">
          {content.vote_average / 2}
        </p>
      </h2>

      <h2 className="flex items-center gap-2 text-muted-foreground text-lg px-4 py-1">
        Popularity:{" "}
        <p className="text-foreground tracking-tight text-xl">
          {content.popularity}
        </p>
      </h2>

      <div className="flex items-center gap-2 border-y py-2 px-4">
        <div className="flex-1 flex items-center gap-2 flex-wrap">
          <h2 className="text-lg text-muted-foreground">Genres:</h2>
          {content?.genres?.map((item) => (
            <Badge
              variant={"secondary"}
              key={item.id}
              className="text-sm font-light"
            >
              {item.name}
            </Badge>
          ))}
        </div>
      </div>

      {contentType === "tv" && (
        <div className="grid grid-cols-1 md:grid-cols-2 border-y md:divide-x divide-y">
          <h2 className="text-muted-foreground text-lg py-1 px-4">
            Number of Episodes:{" "}
            <span className="text-foreground text-xl tracking-tight">
              {content.number_of_episodes}
            </span>
          </h2>
          <h2 className="text-muted-foreground text-lg py-1 px-4">
            Number of Season:{" "}
            <span className="text-foreground text-xl tracking-tight">
              {content.number_of_seasons}
            </span>
          </h2>
        </div>
      )}

      {content.seasons !== undefined && content?.seasons?.length > 0 && (
        <div className="overflow-x-scroll scroll-hide">
          <BasicCards cardType="poster" seasons={content?.seasons} />
        </div>
      )}
      <div className="h-5"></div>
    </div>
  );
}
