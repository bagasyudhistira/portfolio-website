import { en } from "./en";
import { id } from "./id";
import type { Locale, SiteContent } from "./types";

export const contentByLocale: Record<Locale, SiteContent> = { en, id };

export const getContent = (locale: string): SiteContent =>
  contentByLocale[(locale as Locale) in contentByLocale ? (locale as Locale) : "en"];

export type {
  Locale,
  Project,
  ExperienceItem,
  ExperienceIcon,
  Metric,
  SiteContent,
} from "./types";
