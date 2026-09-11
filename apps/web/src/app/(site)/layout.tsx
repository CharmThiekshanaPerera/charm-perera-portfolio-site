import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { Chatbot } from "@/components/site/chatbot";
import { PageViewTracker } from "@/components/site/page-view-tracker";
import { IconSprite } from "@/components/shared/icon";
import { ConsentDefaultScript } from "@/components/site/consent-default-script";
import { CookieConsent } from "@/components/site/cookie-consent";
import { GoogleTagManager } from "@next/third-parties/google";
import { getSiteSettings } from "@/lib/content";

/**
 * Shell for every public page. The admin panel lives outside this group so it
 * gets none of the marketing chrome.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const gtmId = settings.seo?.gtmContainerId ?? "";

  return (
    <>
      {/*
        Tag Manager loads on the public site only - never on /admin, which is
        noindex and whose traffic would just be noise in your GTM data. The
        container ID comes from site settings, so it can be changed or emptied
        from the admin without a deploy; empty renders nothing at all.
      */}
      {gtmId ? (
        <>
          <ConsentDefaultScript />
          <GoogleTagManager gtmId={gtmId} />
        </>
      ) : null}

      {/*
        Step 2 of Google's install snippet. @next/third-parties injects the
        script but not this fallback, which is the only way a visitor with
        JavaScript disabled registers as a page view. This layout is the first
        child of <body>, so the iframe sits as near the top as the App Router
        allows.
      */}
      {gtmId ? (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
      ) : null}

      <IconSprite />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <SiteHeader initials={settings.initials || "CT"} />

      <main id="main" className="min-h-screen">
        {children}
      </main>

      <SiteFooter settings={settings} />
      <WhatsAppButton number={settings.whatsapp} />
      <Chatbot />
      <PageViewTracker />
      {gtmId ? <CookieConsent /> : null}
    </>
  );
}
