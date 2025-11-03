import fetchTMDB from "@/hooks/useFetch";
import Cards from "./Cards";

export default async function List({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const list = await fetchTMDB(url);

  return (
    <div className="w-full">
      <div className="w-full border-b">
        <div className="max-w-7xl mx-auto border-x overflow-hidden">
          <h2 className="font-semibold text-2xl tracking-tight border-b border-dashed px-4 py-2">
            {title}
          </h2>
          <div className="overflow-x-scroll scroll-hide">
            <Cards list={list} />
          </div>
        </div>
      </div>

      <div className="border-b">
        <div className="relative max-w-7xl mx-auto h-10">
          <div className="absolute inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
        </div>
      </div>
    </div>
  );
}
