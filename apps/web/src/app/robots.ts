import type { MetadataRoute } from "next";
import { getSiteSettings, getSiteUrl } from "@/lib/content";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const siteUrl = getSiteUrl(settings);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The admin panel and API surface carry no ranking value and should
        // never appear in an index.
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
