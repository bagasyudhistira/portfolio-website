import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      new URL(`/${locale}`, siteUrl).href,
    ])
  );

  return routing.locales.map((locale) => ({
    url: new URL(`/${locale}`, siteUrl).href,
    alternates: { languages },
  }));
}
