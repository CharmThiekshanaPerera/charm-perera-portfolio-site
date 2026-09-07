import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/content";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings();

  return {
    name: `${settings.fullName} — Freelance Web Developer`,
    short_name: settings.shortName || "Charm Thiekshana",
    description: settings.seo.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#161310",
    theme_color: "#161310",
    lang: "en",
    dir: "ltr",
    scope: "/",
    categories: ["business", "portfolio", "technology"],
    // These paths are produced by the app/favicon.ico, app/icon.png and
    // app/apple-icon.png file conventions.
    icons: [
      { src: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
