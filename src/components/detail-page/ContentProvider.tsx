import fetchTMDB from "@/lib/fetchTMDB";
import { BASE_URL } from "@/lib/constants";
import { ContentMode } from "@/types/types";
import Image from "next/image";

export default async function ContentProvider({
  contentType,
  id,
}: {
  contentType: ContentMode;
  id: number;
}) {
  const url = `${BASE_URL}/${contentType}/${id}/watch/providers`;
  const data = await fetchTMDB(url);
  const providers = data?.results?.US;
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
  const uniqueProviders = allProviders.filter(
    (provider, index, self) =>
      index === self.findIndex((p) => p.provider_id === provider.provider_id)
  );
  console.log("the data is", data);

  if (!data || !data?.results?.US) {
    return <div>No providers available</div>;
  }
  return (
    <div>
      {uniqueProviders?.map((item, index) => (
        <p key={index}>
          {item.provider_name}
          <Image
            src={`https://image.tmdb.org/t/p/w185/${item.logo_path}`}
            alt="logo provider"
            width={100}
            height={100}
            className="rounded-2xl"
          />
        </p>
      ))}
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
