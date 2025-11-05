"use client";
import { BaseImageUrl } from "@/lib/constants";
import { setContentMode } from "@/store/features/uiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface TMDBItem {
  id: number;
  adult: boolean;
  original_title?: string;
  poster_path?: string;
  original_name?: string;
}

export default function Cards({ list }: { list: TMDBItem[] }) {
  const { push } = useRouter();
  const currentContentMode = useAppSelector(
    (state) => state.uiData.contentMode
  );
  const dispatch = useAppDispatch();

  const handleCard = (id: number) => {
    if (currentContentMode === "movie") {
      dispatch(setContentMode("movie"));
      push(`/movie-details/${id}`);
    } else {
      dispatch(setContentMode("tv"));
      push(`/tv-series-details/${id}`);
    }
  };

  return (
    <div className="relative w-full flex transition-all duration-300 divide-x">
      {list.map((item) => (
        <div
          key={item.id}
          onClick={() => handleCard(item.id)}
          className="relative flex-shrink-0 group max-w-fit w-[160px] cursor-pointer"
        >
          <div className="relative flex flex-col items-center px-4 py-6">
            <Image
              width={128}
              height={192}
              src={`${BaseImageUrl}${item.poster_path as string}`}
              alt="poster image"
              priority
              className="object-cover rounded-lg group-hover:scale-[1.2] transition-all duration-300 ease-in-out group-hover:z-10 group-hover:shadow-2xl"
            />
          </div>
          <p className="border-t px-4 py-2 truncate whitespace-nowrap overflow-hidden w-full text-foreground/80 group-hover:text-foreground">
            {item.original_title || item.original_name}
          </p>
        </div>
      ))}
    </div>
  );
}
