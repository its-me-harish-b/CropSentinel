import type { Language } from "@/contexts/LanguageContext";
import type { PestInfo } from "@/data/pestData";
import { pestTranslations } from "@/data/pestTranslations";

export function localizePest(pest: PestInfo, language: Language): PestInfo {
  const tr = pestTranslations[pest.id]?.[language];
  if (!tr) return pest;

  return {
    ...pest,
    name: tr.name ?? pest.name,
    description: tr.description ?? pest.description,
    remedies: pest.remedies.map((r, i) => {
      const rtr = tr.remedies?.[i];
      return {
        ...r,
        name: rtr?.name ?? r.name,
        description: rtr?.description ?? r.description,
        application: rtr?.application ?? r.application,
      };
    }),
  };
}

export function getEffectivenessKey(effectiveness: string): "high" | "medium" | "low" | null {
  const v = (effectiveness || "").trim().toLowerCase();
  if (v === "high") return "high";
  if (v === "medium") return "medium";
  if (v === "low") return "low";
  return null;
}

