import fetchTMDB from "@/lib/fetchTMDB";
import { BASE_URL, Provider_Base_URL } from "@/lib/constants";
import { ContentMode } from "@/types/types";
import Image from "next/image";
import { movieData } from "@/mock/movie";
import { tvData } from "@/mock/tv";

export default async function ContentProvider({
  contentType,
  id,
}: {
  contentType: ContentMode;
  id: number;
}) {
  const url = `${BASE_URL}/${contentType}/${id}/watch/providers`;
  //   const url = "https://api.themoviedb.org/3/movie/693134/watch/providers";
  const data = await fetchTMDB(url);
  const providers = data?.data?.results?.US;
  const buyProvider = providers?.buy || [];
  const rentProvider = providers?.rent || [];
  const flatrateProvider = providers?.flatrate || [];
  const adsProvider = providers?.ads || [];
  const freeProvider = providers?.free || [];
  const allProviders = [
    ...buyProvider,
    ...rentProvider,
    ...flatrateProvider,
    ...adsProvider,
    ...freeProvider,
  ];
  let uniqueProviders = [];
  uniqueProviders = allProviders.filter(
    (provider, index, self) =>
      index === self.findIndex((p) => p.provider_id === provider.provider_id)
  );

  if (!data?.error && Object.keys(data?.data?.results).length === 0) {
    return (
      <div className="border-b border-dashed border-foreground/30">
        <div className="max-w-7xl mx-auto border-x">
          <h1 className=" font-semibold tracking-tight px-4 py-1 text-2xl">
            No Providers Available!
          </h1>
          <div className="h-10 border-t" />
        </div>
      </div>
    );
  }

  if (data.error) {
    uniqueProviders =
      contentType === "movie"
        ? movieData.watchProviders
        : tvData.watchProviders;
  }
  return (
    <div className="border-b border-foreground/30 border-dashed">
      <h2 className="max-w-7xl mx-auto px-4 py-1 border-x text-2xl font-semibold tracking-tight border-b">
        Available Providers
      </h2>
      <div className="max-w-7xl mx-auto border-x flex flex-col gap-4 py-5">
        <div className="px-4 flex items-center flex-wrap gap-6">
          {uniqueProviders?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 overflow-hidden max-w-[100px]"
            >
              <Image
                src={`${Provider_Base_URL}/${item.logo_path}`}
                alt="logo provider"
                width={80}
                height={80}
                className="rounded-2xl shadow-lg"
              />
              <p className="text-secondary-foreground text-start text-md whitespace-nowrap truncate overflow-hidden">
                {item.provider_name}
              </p>
            </div>
          ))}
        </div>
        <div className="h-5 border-t" />
      </div>
    </div>
  );
}
