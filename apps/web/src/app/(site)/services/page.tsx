import type { Metadata } from "next";
import { PackagesSection } from "@/components/site/packages-section";
import { FaqSection } from "@/components/site/faq-section";
import {
  getAddOns,
  getServicePackages,
  getSiteSettings,
  getSiteUrl,
  getTestimonials,
} from "@/lib/content";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  professionalServiceSchema,
} from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const packages = await getServicePackages();
  const prices = packages.map((pkg) => pkg.priceValue).filter((value) => value > 0);

  const title = "Freelance Web & Mobile Development Packages";
  const description = prices.length
    ? `Transparent freelance development pricing from $${Math.min(...prices)}. React and Next.js websites, iOS and Android apps, and custom platforms built in ${settings.location}.`
    : `Freelance web and mobile development services from ${settings.location}.`;

  return {
    title,
    description,
    alternates: { canonical: "/services" },
    openGraph: { title, description, url: "/services", type: "website" },
  };
}

export default async function ServicesPage() {
  const [settings, packages, addOns, testimonials] = await Promise.all([
    getSiteSettings(),
    getServicePackages(),
    getAddOns(),
    getTestimonials(),
  ]);

  const siteUrl = getSiteUrl(settings);
  const verified = testimonials.filter((testimonial) => testimonial.verified);

  return (
    <>
      <JsonLd
        data={[
          professionalServiceSchema(settings, siteUrl, packages, verified),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Services", url: "/services" },
            ],
            siteUrl,
          ),
          faqSchema(settings.faqs ?? []),
        ].filter((schema): schema is Record<string, unknown> => schema !== null)}
      />

      <div className="pt-20">
        <PackagesSection
          packages={packages}
          addOns={addOns}
          whatsapp={settings.whatsapp}
          headingLevel="h1"
        />
        <FaqSection faqs={settings.faqs ?? []} />
      </div>
    </>
  );
}
