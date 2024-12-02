import { MetadataRoute } from "next";
import { routing, getPathname } from "@/i18n/routing";

type Href = Parameters<typeof getPathname>[0]["href"];

export default function sitemap(): MetadataRoute.Sitemap {
  // Adapt this as necessary
  return [getEntry("/", 1), getEntry("/imprint", 0.1)];
}

function getEntry(href: Href, priority: number) {
  return {
    url: getUrl(href, routing.defaultLocale),
    priority: priority,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getUrl(href, locale)]),
      ),
    },
  };
}

function getUrl(href: Href, locale: (typeof routing.locales)[number]) {
  const pathname = getPathname({ locale, href });
  return process.env.NEXT_PUBLIC_BASE_URL + pathname;
}
// Recommended Priorities:
// Homepage: 1,
// Produkte, Übersichten, etc: 0.7,
// Detailseiten: 0.5,
// Impressum, AGB, ... : 0.1
// Markenwelten und Magazinbereiche(Marketing): 0.9
