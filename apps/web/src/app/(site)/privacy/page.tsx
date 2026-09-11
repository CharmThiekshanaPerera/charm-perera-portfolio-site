import type { Metadata } from "next";
import { Markdown } from "@/components/site/markdown";
import { getSiteSettings, getSiteUrl } from "@/lib/content";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title = `Privacy Policy — ${settings.fullName}`;
  const description = `How ${settings.fullName} collects, uses and protects your information on this website.`;

  return {
    title,
    description,
    alternates: { canonical: "/privacy" },
    openGraph: { title, description, url: "/privacy", type: "website" },
  };
}

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  const siteUrl = getSiteUrl(settings);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Privacy Policy", url: "/privacy" },
            ],
            siteUrl,
          ),
        ]}
      />

      <div className="pt-20">
        <section className="container mx-auto px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-10 text-3xl font-bold sm:text-4xl">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <Markdown>{settings.privacyPolicy}</Markdown>
          </div>
        </section>
      </div>
    </>
  );
}
