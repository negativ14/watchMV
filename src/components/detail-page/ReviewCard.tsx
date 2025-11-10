"use client";
import { Image_BASE_URL } from "@/lib/constants";
import Image from "next/image";
import { useState } from "react";
import { IReview } from "./ContentReviews";
import avatar from "@/assets/images/fallback_avatar.png";

export default function ReviewCard({ item }: { item: IReview }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div className="bg-secondary rounded-xl p-4 flex flex-col gap-3 shadow-sm">
      <div className="flex items-center gap-3">
        <Image
          src={
            item.author_details.avatar_path
              ? `${Image_BASE_URL}${item.author_details.avatar_path}`
              : avatar
          }
          alt="avatar"
          height={40}
          width={40}
          loading="lazy"
          priority={false}
          className="rounded-full object-cover"
        />
        <h2 className="text-xl font-medium tracking-tight">
          {item.author_details.username}
        </h2>
      </div>

      <div>
        <p
          className={`text-base text-muted-foreground leading-relaxed tracking-tighter transition-all duration-300 ease-in-out ${
            expanded ? "line-clamp-none" : "line-clamp-3"
          }`}
        >
          {item.content}
        </p>

        {item.content.length > 200 && (
          <button
            onClick={toggleExpand}
            className="text-primary mt-2 text-sm font-medium hover:underline"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}
