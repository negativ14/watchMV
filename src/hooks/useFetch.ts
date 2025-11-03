import { options } from "@/lib/constants";

export default async function fetchTMDB(url: string) {
  try {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 43200 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data!");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Error while fetching", error);
    return [];
  }
}
