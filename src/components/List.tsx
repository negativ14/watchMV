import Cards from "./Cards";
import fetchCache from "@/lib/fetchCache";

export default async function List({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const data = await fetchCache(url);
  const list = data?.results;

  return (
    <div className="w-full">
      <div className="w-full border-b">
        {list?.length > 0 && (
          <div className="max-w-7xl mx-auto border-x overflow-hidden">
            <h2 className="font-semibold text-2xl tracking-tight border-b border-dashed px-4 py-2">
              {title}
            </h2>
            <div className="overflow-x-scroll scroll-hide">
              <Cards list={list} />
            </div>
          </div>
        )}
      </div>
      {list?.length > 0 && (
        <div className="border-b border-foreground/30">
          <div className="relative max-w-7xl mx-auto h-10">
            <div className="absolute opacity-80 inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
          </div>
        </div>
      )}
    </div>
  );
}
