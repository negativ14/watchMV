import LibraryCards from "./LibraryCard";
import { CardCategory } from "@/types/types";

export default async function LibraryList({
  title,
  cardCategory,
}: {
  title: string;
  cardCategory: CardCategory;
}) {
  return (
    <div className="w-full">
      <div className="w-full border-b border-foreground/30">
        <div className="max-w-7xl mx-auto border-x overflow-hidden">
          <h2 className="font-semibold text-2xl tracking-tight border-b border-dashed border-foreground/30 px-4 py-2">
            {title}
          </h2>
          <div>
            <LibraryCards cardCategory={cardCategory} />
          </div>
        </div>
      </div>

      <div className="border-b">
        <div className="relative max-w-7xl mx-auto h-10">
          <div className="absolute opacity-80 inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
        </div>
      </div>
    </div>
  );
}
