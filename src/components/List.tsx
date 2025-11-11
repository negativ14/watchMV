import Cards from "./Cards";
import fetchCache from "@/lib/fetchCache";

export default async function List({
  title,
  url,
  dataList,
}: {
  title: string;
  url?: string;
  dataList?: Record<string, unknown>[];
}) {
  let data;
  let list;
  if (!dataList) {
    data = await fetchCache(url || "");
    list = data?.results;
  }

  const finalList = dataList?.length ? dataList : list;

  return (
    <div className="w-full">
      <div className="w-full border-b">
        {finalList?.length > 0 && (
          <div className="max-w-7xl mx-auto border-x overflow-hidden">
            <h2 className="font-semibold text-2xl tracking-tight border-b border-dashed px-4 py-2">
              {title}
            </h2>
            <div className="overflow-x-scroll scroll-hide">
              <Cards list={finalList} />
            </div>
          </div>
        )}
      </div>
      {finalList?.length === 0 && (
        <div className="border-b border-foreground/30">
          <div className="relative max-w-7xl mx-auto h-20">
            <h2 className="text-xl font-semibold tracking-tight text-center py-1 border-t">
              No {title} Available
            </h2>
            <div className="relative h-10 border-t">
              <div className="absolute opacity-80 inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
