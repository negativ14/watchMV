import { options } from "@/lib/constants";

export default async function fetchCache(url: string) {
  try {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 43200 },
    });
    if (!response.ok) {
      console.error(`Failed: ${response.status} - ${url}`);
      return [];
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error while fetching", error);
    return [];
  }
}
