"use client";
import Image from "next/image";
import { IReview } from "./ContentReviews";
import { Image_BASE_URL } from "@/lib/constants";
import avatar from "@/assets/images/fallback_avatar.png";
import { useState } from "react";

export default function Reviews({ reviews }: { reviews: IReview[] }) {
  return (
    <div className="border-b border-foreground/30 border-dashed">
      <div className="max-w-7xl mx-auto border-x">
        <h1 className="text-2xl font-semibold tracking-tight px-4 py-1 border-b">
          Reviews
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="flex flex-col gap-4">
            {reviews?.slice(0, 3).map((item) => (
              <ReviewCard key={item.id} item={item} />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {reviews?.slice(3, 6).map((item) => (
              <ReviewCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="h-10 border-t" />
      </div>
    </div>
  );
}

function ReviewCard({ item }: { item: IReview }) {
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
