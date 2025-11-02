import { Languages } from "@/types/types";

interface ILanguages {
  id: Languages;
  langugae: string;
}

export const langugaes: ILanguages[] = [
  { id: "en", langugae: "English" },
  { id: "hindi", langugae: "Hindi" },
];

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  },
};
