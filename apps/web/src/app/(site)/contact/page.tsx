import type { Metadata } from "next";
import { ContactSection } from "@/components/site/contact-section";
import { getSiteSettings, getSiteUrl } from "@/lib/content";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title = `Contact ${settings.fullName} — Freelance Developer`;
  const description = `Hire a freelance web and mobile developer in ${settings.location}. Get in touch by email, WhatsApp or the contact form for a project quote.`;

  return {
    title,
    description,
    alternates: { canonical: "/contact" },
    openGraph: { title, description, url: "/contact", type: "website" },
  };
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const siteUrl = getSiteUrl(settings);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Contact", url: "/contact" },
            ],
            siteUrl,
          ),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact",
            url: `${siteUrl}/contact`,
            mainEntity: { "@id": `${siteUrl}/#person` },
          },
        ]}
      />

      <div className="pt-20">
        <ContactSection settings={settings} headingLevel="h1" />
      </div>
    </>
  );
}
