import { options } from "@/lib/constants";

export default async function fetchTMDB(url: string) {
  try {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 43200 },
    });
    if (!response.ok) {
      return { error: true, status: response.status, data: null };
    }
    const data = await response.json();
    if (
      !data ||
      (Array.isArray(data.results) && data.results.length === 0) ||
      Object.keys(data).length === 0
    ) {
      console.warn(`⚠️ Empty data received from: ${url}`);
      return { error: false, empty: true, data: null };
    }

    return { error: false, empty: false, data };
  } catch (error) {
    console.log("Error while fetching", error);
    return { error: true, status: "network-failed", data: null };
  }
}
