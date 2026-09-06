import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@charm/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteSettings, getSiteUrl } from "@/lib/content";
import "./globals.css";

/**
 * Self-hosted via next/font: the font files are served from our own origin and
 * preloaded, so there is no render-blocking request to fonts.googleapis.com and
 * no layout shift. The old site loaded these with a blocking <link>.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#161310" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = getSiteUrl(settings);
  const title = settings.seo.defaultTitle || settings.fullName;
  const description = settings.seo.defaultDescription;

  return {
    // metadataBase makes every relative OG/canonical URL below absolute.
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: settings.seo.titleTemplate || `%s | ${settings.shortName}`,
    },
    description,
    keywords: settings.seo.keywords,
    authors: [{ name: settings.fullName, url: siteUrl }],
    creator: settings.fullName,
    publisher: settings.fullName,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_LK",
      url: siteUrl,
      siteName: settings.fullName,
      title,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: settings.seo.twitterHandle || undefined,
      creator: settings.seo.twitterHandle || undefined,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: settings.seo.googleSiteVerification || undefined,
      other: settings.seo.bingSiteVerification
        ? { "msvalidate.01": settings.seo.bingSiteVerification }
        : undefined,
    },
    category: "technology",
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
