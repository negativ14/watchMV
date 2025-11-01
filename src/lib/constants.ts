import { Languages } from "@/types/types";

interface ILanguages {
  id: Languages;
  langugae: string;
}

export const langugaes: ILanguages[] = [
  { id: "en", langugae: "English" },
  { id: "hindi", langugae: "Hindi" },
];
