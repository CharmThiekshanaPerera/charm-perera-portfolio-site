import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/content";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings();

  return {
    name: `${settings.fullName} — Freelance Web Developer`,
    short_name: settings.shortName || "Charm Perera",
    description: settings.seo.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#161310",
    theme_color: "#161310",
    lang: "en",
    dir: "ltr",
    scope: "/",
    categories: ["business", "portfolio", "technology"],
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/icon", sizes: "512x512", type: "image/png" },
    ],
  };
}
