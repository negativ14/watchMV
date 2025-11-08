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
  //   const url = `${BASE_URL}/${contentType}/${id}/watch/providers`;
  const url = "https://api.themoviedb.org/3/movie/693134/watch/providers";
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
  console.log("the prviders is", data);

  if (!data?.error && Object.keys(data?.data?.results).length === 0) {
    return (
      <h2 className="max-w-7xl mx-auto border px-4 py-1 text-xl tracking-tight">
        No providers available!!
      </h2>
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
      <div className="max-w-7xl mx-auto border-x flex flex-col gap-4 py-5">
        <h2 className=" px-4 py-1 text-xl tracking-tight">
          Available Providers
        </h2>
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
      </div>
    </div>
  );
}

// {buyProvider.map((item: {logo_path: string,
//           provider_id: number,
//           provider_name:string,
//           display_priority: number},index: number) => (<p key={index}>
//         {item?.provider_name as string}
//       </p>))}

//https://api.themoviedb.org/3/tv/series_id/watch/providers

// const country = 'IN'; // user’s country code
// const providers = data.results[country];

// if (providers) {
//   console.log("Watch in", country, "on:");
//   providers.flatrate?.forEach(p => console.log(p.provider_name));
//   providers.buy?.forEach(p => console.log("Buy on:", p.provider_name));
// }
