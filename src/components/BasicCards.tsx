import { Image_BASE_URL } from "@/lib/constants";
import Image from "next/image";
import avatar from "@/assets/images/fallback_avatar.png";
import { cn } from "@/lib/utils";

export default function BasicCards({
  seasons,
  cardType,
  cast,
}: {
  seasons?: Record<string, unknown>[];
  cardType: "cast" | "poster";
  cast?: Record<string, unknown>[];
}) {
  const list = cardType === "cast" ? cast : seasons;
  return (
    <div className="relative w-full flex transition-all duration-300 divide-x border-y">
      {list?.map((item, index) => (
        <div
          key={item.id as number}
          className={`relative flex-shrink-0 group max-w-fit w-[160px] cursor-pointer ${
            index === list.length - 1 ? "border-r" : ""
          }`}
        >
          <div className={cn("flex flex-col justify-between w-full h-[280px]")}>
            <div className="relative flex items-center justify-center px-4 py-4 flex-1 overflow-hidden">
              <Image
                width={128}
                height={192}
                src={
                  cardType === "poster"
                    ? `${Image_BASE_URL}${item.poster_path as string}`
                    : item.profile_path
                    ? `${Image_BASE_URL}${item.profile_path as string}`
                    : avatar
                }
                alt="poster image"
                priority
                className={`object-cover rounded-lg group-hover:scale-[1.2] transition-all duration-300 ease-in-out group-hover:z-10 group-hover:shadow-2xl ${
                  cardType === "cast" && "rounded-full w-[120px] h-[170px]"
                }`}
              />
            </div>

            {cardType === "poster" && (
              <p className="border-t px-4 py-2 truncate whitespace-nowrap overflow-hidden w-full text-foreground/80 group-hover:text-foreground">
                {item?.name as string}
              </p>
            )}

            {cardType === "cast" && (
              <div className="border-t px-4 py-3 w-full text-foreground/80 group-hover:text-foreground flex flex-col gap-1 ">
                <h2 className="truncate whitespace-nowrap">
                  {item.name as string}
                </h2>
                <p className="text-muted-foreground text-xs truncate whitespace-nowrap">
                  {item.character as string}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
