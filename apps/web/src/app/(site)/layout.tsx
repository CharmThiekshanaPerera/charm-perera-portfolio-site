import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { Chatbot } from "@/components/site/chatbot";
import { PageViewTracker } from "@/components/site/page-view-tracker";
import { IconSprite } from "@/components/shared/icon";
import { getSiteSettings } from "@/lib/content";

/**
 * Shell for every public page. The admin panel lives outside this group so it
 * gets none of the marketing chrome.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
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
    </>
  );
}
